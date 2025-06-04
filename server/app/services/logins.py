from app.models.logins import Logins
from json import loads
from uuid import uuid4
import hashlib
from flask import jsonify, make_response
from app.models import db
import logging

logger = logging.getLogger(__name__)


def accessToken():
    rawUUID = uuid4().hex
    hashed = hashlib.sha256(rawUUID.encode()).hexdigest()
    return hashed


def generateUniqueToken():
    while True:
        token = accessToken()
        if not Logins.query.filter_by(token=token).first():
            return token


def adminLogin(email, password):
    with open("config.json", "r") as config:
        config = loads(config.read())
        if (
            config.get("admin").get("email") == email
            and config.get("admin").get("password") == password
        ):
            Logins.query.filter_by(role="admin", email=email).update(
                {Logins.is_active: False}
            )
            token = generateUniqueToken()
            response = make_response(jsonify({"message": "Login Successfull"}))
            response.set_cookie(
                "token",  # Cookie name
                token,  # Token value
                max_age=60 * 60,  # 1 hour in seconds
                httponly=True,  # Prevent client JS access
                secure=True,  # Only send over HTTPS (set False for local dev)
                samesite="Lax",
            )
            login = Logins(role="admin", email=email, token=token, role_level=1)
            db.session.add(login)
            db.session.commit()
            logger.info("Admin login")
            return response, 201
        logger.warn("Invalid admin login attempt")
        return jsonify({"error": "Login credentials invalid"}), 401
