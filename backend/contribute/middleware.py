from django.http import HttpResponse


class CorsMiddleware:
    """
    Adds CORS headers to every response so the Chrome extension's content
    script — which runs on https://www.usvisascheduling.com — can POST to
    this server.

    Also handles Chrome's Private Network Access preflight: when a public
    HTTPS page fetches http://localhost, Chrome sends an extra OPTIONS check
    with 'Access-Control-Request-Private-Network: true'. This middleware
    echoes back 'Access-Control-Allow-Private-Network: true' so that check
    passes without any extra configuration.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == "OPTIONS":
            # Short-circuit: reply to preflight before Django's own routing.
            response = HttpResponse(status=204)
        else:
            response = self.get_response(request)

        origin = request.headers.get("Origin", "*")
        response["Access-Control-Allow-Origin"] = origin
        response["Vary"] = "Origin"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        response["Access-Control-Max-Age"] = "86400"

        if request.headers.get("Access-Control-Request-Private-Network") == "true":
            response["Access-Control-Allow-Private-Network"] = "true"

        return response
