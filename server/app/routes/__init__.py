from .students import student_blueprint
from .courses import courses_blueprint
from .instructors import instructors_blueprint
from .applications import application_blueprint
from .logins import auth_blueprint

def register_routes(app):
    app.register_blueprint(student_blueprint, url_prefix="/api/v1/students")
    app.register_blueprint(courses_blueprint, url_prefix="/api/v1/courses")
    app.register_blueprint(instructors_blueprint, url_prefix="/api/v1/instructors/")
    app.register_blueprint(application_blueprint, url_prefix="/api/v1/applications")
    app.register_blueprint(auth_blueprint, url_prefix="/api/v1/auth")
