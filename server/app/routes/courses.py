from flask import Blueprint, request, jsonify

from app.services.courses import (
    getAllCourses,
    addCourse,
    getCourseById,
    getSectionsByCourse,
    addSection,
)
from app.models.courses import CourseSection

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


@courses_blueprint.route("/<int:course_id>/sections", methods=["GET", "POST"])
def SectionManagementByCourse(course_id):
    if not course_id:
        return jsonify({"error": "Course ID can't be null"})
    if request.method == "GET":
        return getSectionsByCourse(course_id=course_id)
    elif request.method == "POST":
        return addSection(course_id=course_id, sectionDetails=request.json)
