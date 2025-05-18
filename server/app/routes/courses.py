from flask import Blueprint, request

from app.services.courses import getAllCourses, addCourse, getCourseById

courses_blueprint = Blueprint("courses", __name__)


@courses_blueprint.route("/", methods=["GET", "POST"])
def CourseManagment():
    if request.method == "GET":
        return getAllCourses()
    elif request.method == "POST":
        return addCourse(courseDetails=request.json)


@courses_blueprint.route("/<int:course_id>", methods=["GET", "PATCH"])
def CourseManagmentById(course_id):
    if request.method == "GET":
        return getCourseById(course_id=course_id)
