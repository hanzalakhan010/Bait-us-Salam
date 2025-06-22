from functools import wraps
from flask import request, jsonify, session
from app.models.logins import Logins
from datetime import datetime
from flask import make_response
import logging

logger = logging.getLogger(__name__)


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
        if login and login.expires_at > datetime.utcnow():
            return jsonify({"message": "auth successfull"}), 200
        return jsonify({"error": "Session expired"}), 403
    return jsonify({"error": "Auth unsucessfull"}), 403


def studentAuth(student_id):
    # print(session)
    if (session.get("user", {})).get("role") == "admin":
        return True
    if session.get("user", {}).get("student_id", "") == student_id:
        return True
    if (session.get("user", {})).get("role") == "student":
        logger.warn(
            f"Suspicious activity by student with studentID:{session.get('user', {}).get('student_id', '')}"
        )
        return False
    logger.warn(f"Suspicious activity with session:{session}")
    return False


def logout(token):
    session.clear()
    if token:
        login = Logins.query.filter_by(token=token, is_active=True).first()
        if login:
            login.is_active = False
            response = make_response(jsonify({"message": "Logout Sccuessfull"}))
            response.set_cookie("token", "", expires=0)
            logger.info(f"Student logout: [Login ID >> {login.id}]")
            return response
        return jsonify({"error": "login not found"})
    return jsonify({"error": "Token not found"}), 403
