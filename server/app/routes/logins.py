from flask import Blueprint, request, jsonify
from app.services.auth import checkAuth, logout

auth_blueprint = Blueprint("auth", __name__)

from app.services.logins import adminLogin, studentLogin


@auth_blueprint.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", "")
    password = request.json.get("password", "")
    role = request.json.get("role", "")

    if email and role:
        if role == "admin":
            return adminLogin(email=email, password=password)
        elif role == "student":
            return studentLogin(email=email, password=password)
        else:
            return jsonify({"error": "role not defined"})
    else:
        return jsonify({"message": "Invalid credentials"}), 401


@auth_blueprint.route("/logout", methods=["POST"])
def logoutFunc():
    token = request.cookies.get("token")
    return logout(token=token)


@auth_blueprint.route("/auth", methods=["POST"])
def auth():
    token = request.cookies.get("token")
    return checkAuth(token=token)
