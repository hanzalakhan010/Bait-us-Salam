from app.models import db
from app.models.courses import Courses, CourseEnrollment
from app.models.students import Students
from flask import jsonify, session
import logging

# from json import d
from app.models.courses import CourseSection


logger = logging.getLogger(__name__)


def getAllCourses(filters):
    courses = Courses.query.filter_by(**filters)
    return (
        jsonify(
            {
                "courses": [
                    course.to_dict_short(
                        role=session.get("user", {}).get("role", "public")
                    )
                    for course in courses
                ]
            }
        ),
        200,
    )


def getCourseDetailsById(course_id):
    course = Courses.query.get_or_404(course_id)
    return jsonify({"course": course.to_dict_details()})


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


def getSectionsByCourse(course_id, size="large"):
    sections = CourseSection.query.filter_by(course_id=course_id)
    if size == "short":
        return jsonify({"sections": [section.to_dict_short() for section in sections]})
    return jsonify({"sections": [section.to_dict() for section in sections]})


def updateCourseDetails(course_id, courseDetails):
    course = Courses.query.get_or_404(course_id)
    if course:
        course_name = courseDetails.get("course_name", "")
        course_description = courseDetails.get("course_description", "")
        requirements = courseDetails.get("requirements", "")
        status = courseDetails.get("status", "")
        if course_name:
            course.course_name = course_name
        if course_description:
            course.course_description = course_description
        if requirements:
            course.requirements = requirements
        if status:
            course.status = status
        logger.info(f"CourseID: {course_id} details updated by admin")
        db.session.commit()
        return jsonify({"message": "Course details updated"}), 201
    return jsonify({"error": "Course not found"}), 404


def getUnrosteredStudents(course_id):

    students = (
        db.session.query(
            Students.id, Students.name, CourseEnrollment.date.label("enrollment_date")
        )
        .join(CourseEnrollment, Students.id == CourseEnrollment.student_id)
        .filter(
            CourseEnrollment.course_id == course_id,
            CourseEnrollment.course_section_id == None,
        )
        .all()
    )
    return (
        jsonify(
            {
                "students": [
                    {
                        "id": student.id,
                        "name": student.name,
                        "enrollment_date": student.enrollment_date,
                    }
                    for student in students
                ]
            }
        ),
        200,
    )
