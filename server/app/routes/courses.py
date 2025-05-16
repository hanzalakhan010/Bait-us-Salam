from flask import Blueprint, request, jsonify

from app.models.courses import Courses
from app.models import db

courses_blueprint = Blueprint("courses", __name__)


@courses_blueprint.route("/", methods=["GET", "POST"])
def CourseManagment():
    if request.method == "GET":
        courses = Courses.query.all()
        return jsonify({"courses": [course.to_dict() for course in courses]}), 200
    elif request.method == "POST":
        ...
