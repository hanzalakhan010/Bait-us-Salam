from functools import wraps
from flask import request, jsonify
from app.models.logins import Logins
from datetime import datetime


def AuthRequired(min_level=None, method_levels=None):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = request.headers.get("Token")
            email = request.headers.get("Email")

            if not token or not email:
                return jsonify({"error": "Missing credentials"}), 401

            login = Logins.query.filter_by(
                email=email, token=token, is_active=True
            ).first()

            if not login:
                return jsonify({"error": "Authentication failed"}), 401

            if login.expires_at < datetime.utcnow():
                return jsonify({"error": "Session expired"}), 401
            current_method = request.method
            required_level = None
            if method_levels and current_method in method_levels:
                required_level = method_levels[current_method]
            elif min_level is not None:
                required_level = min_level

            if required_level is not None and required_level < min_level:
                return (
                    jsonify(
                        {"error": f"Insufficient access level for {current_method}"}
                    ),
                    403,
                )

            return f(*args, **kwargs)

        return wrapper

    return decorator
