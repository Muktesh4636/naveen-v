from django.http import HttpResponse, JsonResponse

from .hardening import rate_limit_allow, verify_extension_request


class CorsMiddleware:
    """
    CORS only for extension API paths (/contribute*).

    Panel/admin are same-origin browser forms — do not attach CORS headers
    there (wildcard ACAO can interfere with cookie/CSRF login flows).
    """

    API_PREFIXES = ("/contribute",)

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path or ""
        is_api = any(path.startswith(p) for p in self.API_PREFIXES)

        if is_api and request.method == "OPTIONS":
            response = HttpResponse(status=204)
        else:
            response = self.get_response(request)

        if not is_api:
            return response

        origin = request.headers.get("Origin", "*")
        response["Access-Control-Allow-Origin"] = origin
        response["Vary"] = "Origin"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = (
            "Content-Type, X-VS-Key, X-VS-Ts, X-VS-Sign, X-VS-Device"
        )
        response["Access-Control-Max-Age"] = "86400"

        if request.headers.get("Access-Control-Request-Private-Network") == "true":
            response["Access-Control-Allow-Private-Network"] = "true"

        return response


class ContributeApiAuthMiddleware:
    """
    Block unsigned /contribute API calls.
    Official extension must send HMAC headers (see extension signedFetch).
    """

    API_PREFIXES = ("/contribute",)

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path or ""
        is_api = any(path.startswith(p) for p in self.API_PREFIXES)
        if not is_api or request.method == "OPTIONS":
            return self.get_response(request)

        # Tight rate limit for brute-force without valid auth
        if not rate_limit_allow(request, "auth-gate"):
            return JsonResponse({"k": 0, "e": "rate limited"}, status=429)

        ok, reason = verify_extension_request(request)
        if not ok:
            # Separate bucket so attackers burn auth quota faster
            rate_limit_allow(request, "auth-fail")
            return JsonResponse(
                {"k": 0, "e": "unauthorized", "r": reason},
                status=401,
            )
        return self.get_response(request)
