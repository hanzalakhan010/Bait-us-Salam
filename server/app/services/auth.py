from functools import wraps
from flask import request, jsonify
from app.models.logins import Logins
from datetime import datetime


def AuthRequired(min_level=None, method_levels=None):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = request.cookies.get("token")
            # email = request.headers.get("Email")

            if not token:
                return jsonify({"error": "Missing token"}), 401

            login = Logins.query.filter_by(token=token, is_active=True).first()

            if not login:
                return jsonify({"error": "Authentication failed"}), 401

            if login.expires_at < datetime.utcnow():
                return jsonify({"error": "Session expired"}), 401

            if (min_level is not None) and (min_level < login.role_level):
                return (
                    jsonify({"error": f"Insufficient Access rights"}),
                    403,
                )
            if method_levels is not None:
                current_method = request.method
                if current_method in method_levels:
                    if method_levels[current_method] < login.role_level:
                        return (
                            jsonify({"error": f"Insufficient Access rights"}),
                            403,
                        )

            return f(*args, **kwargs)

        return wrapper

    return decorator


def checkAuth(token):
    if token:
        login = Logins.query.filter_by(token=token, is_active=True).first()
        if login.expires_at > datetime.utcnow():
            return jsonify({"message": "auth successfull"}), 200
        return jsonify({"error": "Session expired"}), 403
    return jsonify({"error": "Auth unsucessfull"}), 403
