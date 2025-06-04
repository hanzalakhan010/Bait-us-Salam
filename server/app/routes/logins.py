from flask import Blueprint, request, jsonify
from app.services.auth import checkAuth

auth_blueprint = Blueprint("auth", __name__)

from app.services.logins import adminLogin


@auth_blueprint.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", "")
    password = request.json.get("password", "")
    role = request.json.get("role", "")

    if email and password and role:
        if role == "admin":
            return adminLogin(email=email, password=password)
        elif role == "student":
            ...
    else:
        return jsonify({"message": "Invalid credentials"}), 401
    # Here you would typically check the email and password against a database


@auth_blueprint.route("/logout", methods=["POST"])
def logout():
    # Here you would typically handle the logout logic, such as clearing session data
    return jsonify({"message": "Logout successful"}), 200


@auth_blueprint.route("/auth", methods=["POST"])
def auth():
    token = request.cookies.get("token")
    return checkAuth(token=token)
