from django.http import HttpResponse


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
        response["Access-Control-Allow-Headers"] = "Content-Type"
        response["Access-Control-Max-Age"] = "86400"

        if request.headers.get("Access-Control-Request-Private-Network") == "true":
            response["Access-Control-Allow-Private-Network"] = "true"

        return response
