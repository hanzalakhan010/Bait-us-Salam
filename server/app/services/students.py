from app.models import db
from app.models.students import Students
from flask import jsonify


def getAllStudents():
    students = Students.query.all()
    return [student.to_dict_short() for student in students]


def editStudentDetailsById(student_id, data):
    student = Students.query.get_or_404(student_id)
    for key, value in data.items():
        if hasattr(student, key):
            setattr(student, key, value)
    db.session.commit()


def removeStudentById(student_id):
    student = Students.query.get_or_404(student_id)
    db.session.remove(student)
    db.session.commit()


def getStudentDetailsById(student_id):
    student = Students.query.get_or_404(student_id)
    return student.to_dict()


def registerStudent(studentDetails: dict):
    name = studentDetails.get("name")
    father_name = studentDetails.get("father_name")
    cnic = studentDetails.get("cnic")
    father_cnic = studentDetails.get("father_cnic")
    dob = studentDetails.get("dob")
    address = studentDetails.get("address")
    phone = studentDetails.get("phone")
    email = studentDetails.get("email")
    password = studentDetails.get("password")
    if Students.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400
    try:
        newStudent = Students(
            name=name,
            father_name=father_name,
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
        print(studentDetails)
        print(error)
        db.session.rollback()
        return jsonify({"error": "Can not add student at the moment"}), 400


def getStudentCoursesById(student_id):
    from app.models.courses import CourseEnrollment, Courses
    course_enrollmnents = CourseEnrollment.query.filter_by(student_id=student_id)
    
