from app.models.logins import Logins
from json import loads
from uuid import uuid4
from flask import jsonify
from app.models import db
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


def adminLogin(email, password):
    with open("config.json", "r") as config:
        config = loads(config.read())
        print(config)

        if (
            config.get("admin").get("email") == email
            and config.get("admin").get("password") == password
        ):
            Logins.query.filter_by(role="admin", email=email).update(
                {Logins.is_active: False}
            )
            token = str(uuid4())
            login = Logins(role="admin", email=email, token=token, role_level=1)
            db.session.add(login)
            db.session.commit()
            logger.info("Admin login")
            return jsonify({"message": "Login Successfull", "token": token}), 201
        logger.warn("Invalid admin login attempt")
        return jsonify({"error": "Login credentials invalid"}), 401
