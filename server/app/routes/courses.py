from flask import Blueprint, request, jsonify
from app.services.auth import AuthRequired
from app.services.courses import (
    getAllCourses,
    addCourse,
    getCourseDetailsById,
    getSectionsByCourse,
    addSection,
    updateCourseDetails,
    getUnrosteredStudents,
)

courses_blueprint = Blueprint("courses", __name__)


@AuthRequired(method_levels={"GET": 3, "POST": 1})
@courses_blueprint.route("/", methods=["GET", "POST"])
def CourseManagment():
    if request.method == "GET":
        return getAllCourses()
    elif request.method == "POST":
        return addCourse(courseDetails=request.json)


@courses_blueprint.route("/<int:course_id>/details", methods=["GET", "PATCH"])
@AuthRequired(method_levels={"GET": 4, "PATCH": 1})
def CourseDetailsManagmentById(course_id):
    if request.method == "GET":
        return getCourseDetailsById(course_id=course_id)
    elif request.method == "PATCH":
        courseDetails = request.json
        return updateCourseDetails(course_id=course_id, courseDetails=courseDetails)


@courses_blueprint.route("/<int:course_id>/sections", methods=["GET", "POST"])
@AuthRequired(min_level=1)
def SectionManagementByCourse(course_id):
    if not course_id:
        return jsonify({"error": "Course ID can't be null"})
    if request.method == "GET":
        return getSectionsByCourse(course_id=course_id)
    elif request.method == "POST":
        return addSection(course_id=course_id, sectionDetails=request.json)


@courses_blueprint.route("/<int:course_id>/unrostered", methods=["GET"])
@AuthRequired(min_level=1)
def UnrosteredStudentManagementByCourse(course_id):
    return getUnrosteredStudents(course_id=course_id)
