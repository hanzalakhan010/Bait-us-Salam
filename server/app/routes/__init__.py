from .students import student_blueprint
from .courses import courses_blueprint
# from .auth import auth_blueprint

def register_routes(app):
    app.register_blueprint(student_blueprint, url_prefix="/api/v1/students")
    # app.register_blueprint(courses_blueprint, url_prefix="/api/v1/courses")
    # app.register_blueprint(auth_blueprint, url_prefix="/api/v1/admin")
