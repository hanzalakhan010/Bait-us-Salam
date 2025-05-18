from flask import Flask
from app.extensions import cors
from .models import db
from app.routes import register_routes

def create_app(config_class="app.config.Config"):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)

    with app.app_context():
        db.create_all()
        db.session.commit()
    cors.init_app(app, resources={r"/*": {"origins": "*"}})

    register_routes(app)

    return app