from flask import Blueprint, request, jsonify
from app.services.courseSections import assign

course_section_blueprint = Blueprint("courseSection", __name__)


@course_section_blueprint.route("/<int:section_id>/assign", methods=["POST"])
def assignCourseSection(section_id):
    course_id = request.json.get("course_id")
    student_ids = request.json.get("student_ids")
    if course_id and student_ids:
        return assign(
            course_id=course_id, student_ids=student_ids, course_section_id=section_id
        )
    return jsonify({"error": "Course id and student ids can't be null"}), 401
