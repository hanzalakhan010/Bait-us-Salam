from flask import Blueprint, request, jsonify
from app.services.applications import addApplication
from app.services.auth import AuthRequired
from app.services.students import (
    editStudentDetailsById,
    getStudentDetailsById,
    removeStudentById,
    getAllStudents,
    registerStudent,
    getAvailableCoursesById,
    getApplicationsByStudent,
    getStudentCoursesById,
    getApplicationByID,
)

student_blueprint = Blueprint("students", __name__)


@AuthRequired(min_level=3)
@student_blueprint.route("/<int:student_id>/applications/", methods=["GET", "POST"])
def StudentApplicationManagementById(student_id):
    if request.method == "GET":
        return getApplicationsByStudent(student_id=student_id)
    elif request.method == "POST":
        return addApplication(
            files=request.files,
            course_id=request.headers.get("Course-Id", ""),
            requirementForm=request.form,
            student_id=student_id,
        )


@AuthRequired(min_level=3)
@student_blueprint.route(
    "/<int:student_id>/applications/<int:application_id>", methods=["GET"]
)
def StudentApplicationView(student_id, application_id):
    if request.method == "GET":
        return getApplicationByID(student_id=student_id, application_id=application_id)
    

@AuthRequired(min_level=3)
@student_blueprint.route("/<int:student_id>/available_courses/", methods=["GET"])
def StudentAvailableCourseManagementById(student_id):
    return getAvailableCoursesById(student_id=student_id)


@AuthRequired(method_levels={"GET": 3})
@student_blueprint.route("/<int:student_id>/enrolled_courses/", methods=["GET"])
def StudentCourseManagementById(student_id):
    if request.method == "GET":
        return getStudentCoursesById(student_id=student_id)


@AuthRequired(method_levels={"GET": 3, "PATCH": 1, "DELETE": 1})
@student_blueprint.route(
    "/<int:student_id>/details/", methods=["GET", "PATCH", "DELETE"]
)
def StudentDetailsManagmentById(student_id):
    if request.method == "GET":
        return getStudentDetailsById(student_id=student_id)

    elif request.method == "PATCH":
        data = request.json
        return editStudentDetailsById(student_id=student_id, data=data)

    elif request.method == "DELETE":

        if removeStudentById(student_id=student_id):
            return jsonify({"message": "Student deleted successfully"}), 200
        return jsonify({"error": "Error deleting student"}), 401


@AuthRequired(min_level=1)
@student_blueprint.route("/", methods=["GET", "POST"])
def StudentsManagment():
    if request.method == "GET":
        return (
            jsonify({"students": getAllStudents()}),
            200,
        )
    elif request.method == "POST":
        return registerStudent(studentDetails=request.json)
