from flask import jsonify
import uuid
from app.models import db
from app.models.students import Students


def getAllStudents():
    students = Students.query.all()
    return [student.to_dict_short() for student in students]


def editStudentDetailsById(student_id, data):
    student = Students.query.get_or_404(student_id)
    try:
        for key, value in data.items():
            if hasattr(student, key):
                setattr(student, key, value)
        db.session.commit()
        return jsonify({"message": "Student details updated successfully"}), 200
    except:
        db.session.rollback()
        return jsonify({"error": "Error updating student details"}), 401


def removeStudentById(student_id):
    student = Students.query.get_or_404(student_id)
    try:
        db.session.remove(student)
        db.session.commit()
        return True
    except:
        db.session.rollback()
        return False


def getStudentDetailsById(student_id):
    student = Students.query.get_or_404(student_id)
    return jsonify({"student": student.to_dict()}), 200


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
        db.session.rollback()
        return jsonify({"error": "Can not add student at the moment"}), 400


def getStudentCoursesById(student_id):
    from app.models.courses import CourseEnrollment, Courses, CourseSection

    results = (
        db.session.query(Courses, CourseSection)
        .join(CourseEnrollment, Courses.id == CourseEnrollment.course_id)
        .join(CourseSection, CourseSection.id == CourseEnrollment.course_section_id)
        .filter(CourseEnrollment.student_id == student_id)
        .all()
    )
    return jsonify(
        {
            "courses": [
                {"course": course.to_dict(), "section": section.to_dict()}
                for course, section in results
            ]
        }
    )


def getAvailableCoursesById(student_id):
    from app.models.courses import CourseEnrollment, Courses
    from app.models.applications import Applications

    # Get course IDs from enrollments
    enrolled_course_ids = [
        row.course_id
        for row in CourseEnrollment.query.with_entities(CourseEnrollment.course_id)
        .filter_by(student_id=student_id)
        .all()
    ]

    # Get course IDs from applications
    applied_course_ids = [
        row.course_id
        for row in Applications.query.with_entities(Applications.course_id)
        .filter_by(student_id=student_id)
        .all()
    ]

    # Combine both lists to exclude courses
    excluded_course_ids = set(enrolled_course_ids + applied_course_ids)

    # Filter courses that are not in the excluded list and have inactive status
    available_courses = Courses.query.filter(
        Courses.id.notin_(excluded_course_ids), Courses.status == "inactive"
    ).all()

    return jsonify(
        {"courses": [course.to_dict_short() for course in available_courses]}
    )


def getApplicationByStudent(student_id):
    from app.models.applications import Applications

    applications = Applications.query.filter_by(student_id=student_id)
    return jsonify(
        {"applications": [application.to_dict() for application in applications]}
    )


def studentDocsFolder(student_id):
    student = Students.query.get(student_id)
    if not student:
        return False
    if not student.docs_folder:
        docs_folder = uuid.uuid4()
        student.docs_folder = docs_folder
        db.session.commit()
        return docs_folder
    return student.docs_folder
