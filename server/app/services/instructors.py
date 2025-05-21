from app.models.instructors import Instructors
from flask import jsonify
from app.models import db


def getAllActiveInstructors():
    instructors = Instructors.query.all()
    return (
        jsonify({"instructors": [instructor.to_dict_short() for instructor in instructors]}),
        200,
    )


def addInstructor(instructor_details: dict):
    instructor_name = instructor_details.get("instructor_name", "")
    email = instructor_details.get("email", "")
    password = instructor_details.get("password", "")
    phone = instructor_details.get("phone", "")
    bio = instructor_details.get("bio", "")
    status = "active"
    if not all([instructor_name, email, phone]):
        return jsonify({"error": 'These details cant"t be left empty'})
    new_instructor = Instructors(
        instructor_name=instructor_name,
        email=email,
        password=password,
        phone=phone,
        bio=bio,
        status=status,
    )
    db.session.add(new_instructor)
    db.session.commit()
    return jsonify({"message": "Instructor added succesfully"})
