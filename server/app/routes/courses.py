from flask import Blueprint, request

from app.services.courses import getAllCourses, addCourse

courses_blueprint = Blueprint("courses", __name__)


@courses_blueprint.route("/", methods=["GET", "POST"])
def CourseManagment():
    if request.method == "GET":
        return getAllCourses()
    elif request.method == "POST":
        return addCourse(courseDetails=request.json)
