from app.models import db
from app.models.courses import Courses
from flask import jsonify

# from json import d
from app.models.courses import CourseSection
from app.services.auth import AuthRequired


@AuthRequired(min_level=2)
def getAllCourses():
    courses = Courses.query.all()
    return jsonify({"courses": [course.to_dict_short() for course in courses]}), 200


@AuthRequired(min_level=2)
def getCourseById(course_id):
    course = Courses.query.get_or_404(course_id)
    return jsonify({"course": course.to_dict_details()})


@AuthRequired(min_level=1)
def addCourse(courseDetails: dict):
    course_name = courseDetails.get("course_name", "")
    course_description = courseDetails.get("course_description", "")
    requirements = courseDetails.get("requirements", {})
    if course_name and course_description:
        newCourse = Courses(
            course_name=course_name,
            course_description=course_description,
            requirements=requirements,
            status="inactive",
        )
        db.session.add(newCourse)
        db.session.commit()
        return jsonify({"message": "Course created successfully"}), 201
    return jsonify({"error": "Name or description can't be empty"})

@AuthRequired(min_level=1)
def addSection(course_id: int, sectionDetails: dict):
    title = sectionDetails.get("section_title", "")
    instructor_id = sectionDetails.get("instructor_id", "")
    room = sectionDetails.get("room")
    timings = sectionDetails.get("timings", "")
    if not any([title, course_id, instructor_id]):
        return jsonify({"error": "Emtpty fields are not accepted"}), 400

    new_section = CourseSection(
        title=title,
        instructor_id=instructor_id,
        course_id=course_id,
        room=room,
        timings=timings,
    )
    db.session.add(new_section)
    db.session.commit()
    return jsonify({"message": "Section added Succesufully"}), 201

@AuthRequired(min_level=2)
def getSectionsByCourse(course_id):
    sections = CourseSection.query.filter_by(course_id=course_id)
    return jsonify({"sections": [section.to_dict() for section in sections]})
