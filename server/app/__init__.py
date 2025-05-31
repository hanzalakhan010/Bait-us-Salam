from flask import Flask
from app.extensions import cors
from .models import db
from app.routes import register_routes
from flask_migrate import Migrate
from app.logging_config import setup_logging

UPLOAD_FOLDER = "./uploads/"
migrate = Migrate()


def create_app(config_class="app.config.Config"):
    app = Flask(__name__)
    app.config.from_object(config_class)
    setup_logging()
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, resources={r"/*": {"origins": "*"}})

    register_routes(app)

    return app
