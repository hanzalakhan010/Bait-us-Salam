from flask import Blueprint, request, jsonify
from app.models.students import Students
from flask_cors import cross_origin
from app.models import db
from app.services.students import (
    editStudentById,
    getStudentById,
    removeStudentById,
    getAllStudents,
)

student_blueprint = Blueprint("students", __name__)


@student_blueprint.route("/<int:student_id>", methods=["GET", "PATCH", "DELETE"])
def StudentManagmentById(student_id):
    # student = Students.query.get_or_404(student_id)
    if request.method == "GET":
        return jsonify(getStudentById(student_id=student_id)), 200

    elif request.method == "PATCH":
        data = request.json
        editStudentById(student_id=student_id, data=data)
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
        first_name = request.json.get("first_name")
        last_name = request.json.get("last_name")
        cnic = request.json.get("cnic")
        father_cnic = request.json.get("father_cnic")
        dob = request.json.get("dob")
        address = request.json.get("address")
        phone = request.json.get("phone")
        email = request.json.get("email")
        password = request.json.get("password")
        if Students.query.filter_by(email=email).first():
            return jsonify({"error": "Email already registered"}), 400
        try:
            newStudent = Students(
                first_name=first_name,
                last_name=last_name,
                cnic=cnic,
                father_cnic=father_cnic,
                dob=dob,
                address=address,
                phone=phone,
                email=email,
                password=password,
            )
            db.session.add(newStudent)
            db.session.commit()
            return jsonify({"message": "Student added successfully"}), 201
        except Exception as error:
            print(error)
            db.session.rollback()
            return jsonify({"error": "Can not add student at the moment"}), 400
