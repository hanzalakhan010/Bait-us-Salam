from app.models.courses import CourseEnrollment
from app.models import db
from flask import jsonify


def assign(course_id, course_section_id, student_ids: list):
    for student_id in student_ids:
        enrollment = CourseEnrollment.query.filter_by(
            course_id=course_id, student_id=student_id, course_section_id=None
        ).first()
        if enrollment:
            enrollment.course_section_id = course_section_id
        else:
            continue
    db.session.commit()
    return jsonify({"message": "Assigned Students to selected section"}), 201
