from flask import Flask, abort, send_from_directory
from app.extensions import cors
from .models import db
from app.routes import register_routes
from flask_migrate import Migrate
from app.logging_config import setup_logging
from app.services.auth import AuthRequired
import os

UPLOAD_FOLDER = "./uploads/"
migrate = Migrate()


def create_app(config_class="app.config.Config"):
    app = Flask(__name__)
    app.config.from_object(config_class)
    setup_logging()
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(
        app,
        supports_credentials=True,
        origins=["http://localhost:5173", "http://192.168.10.8:5173"],
    )

    register_routes(app)

    @app.route("/uploads/<folder_id>/<filename>")
    @AuthRequired(min_level=3)
    def serveUploadFolder(folder_id, filename):
        directory = os.path.abspath(os.path.join(UPLOAD_FOLDER, folder_id))
        full_path = os.path.join(directory, filename)
        if not os.path.isfile(full_path):
            abort(404)
        return send_from_directory(directory, filename)

    @app.route("/uploads/courses/<filename>")
    @AuthRequired(min_level=3)
    def serveCourseFolder(filename):
        directory = os.path.abspath(os.path.join(UPLOAD_FOLDER, "courses"))
        full_path = os.path.join(directory, filename)
        if not os.path.isfile(full_path):
            abort(404)
        return send_from_directory(directory, filename)

    return app
