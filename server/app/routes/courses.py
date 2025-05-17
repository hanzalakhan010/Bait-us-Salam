from flask import Blueprint, request, jsonify

from app.services.courses import getAllCourses

courses_blueprint = Blueprint("courses", __name__)


@courses_blueprint.route("/", methods=["GET", "POST"])
def CourseManagment():
    if request.method == "GET":
        return jsonify({"courses": getAllCourses()}), 200
    elif request.method == "POST":
        ...
