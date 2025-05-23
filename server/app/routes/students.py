from flask import Blueprint, request, jsonify
from app.models.students import Students
from app.models import db
from app.services.students import (
    editStudentDetailsById,
    getStudentDetailsById,
    removeStudentById,
    getAllStudents,
    registerStudent,
    getAvailableCoursesById,
)

student_blueprint = Blueprint("students", __name__)


@student_blueprint.route("/<int:student_id>/courses", methods=["GET", "POST"])
def StudentCourseManagementById(student_id):
    if request.method == "GET":
        available_courses = request.args.get("courses")
        if available_courses:
            return getAvailableCoursesById(student_id=student_id)
        return 


@student_blueprint.route(
    "/<int:student_id>/details/", methods=["GET", "PATCH", "DELETE"]
)
def StudentDetailsManagmentById(student_id):
    # student = Students.query.get_or_404(student_id)
    if request.method == "GET":
        return jsonify(getStudentDetailsById(student_id=student_id)), 200

    elif request.method == "PATCH":
        data = request.json
        editStudentDetailsById(student_id=student_id, data=data)
        return jsonify({"message": "Student updated successfully"}), 200

    elif request.method == "DELETE":
        removeStudentById(student_id=student_id)
        return jsonify({"message": "Student deleted successfully"}), 200


@student_blueprint.route("/", methods=["GET", "POST"])
def StudentsManagment():
    if request.method == "GET":
        return (
            jsonify({"students": getAllStudents()}),
            200,
        )
    elif request.method == "POST":
        return registerStudent(studentDetails=request.json)
