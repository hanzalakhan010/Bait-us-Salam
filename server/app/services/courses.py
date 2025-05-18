from app.models import db
from app.models.courses import Courses
from flask import jsonify


def getAllCourses():
    courses = Courses.query.all()
    return jsonify({"courses": [course.to_dict_short() for course in courses]}), 200


def addCourse(courseDetails: dict):
    course_name = courseDetails.get("course_name", "")
    course_description = courseDetails.get("course_description", "")
    if course_name and course_description:
        newCourse = Courses(
            course_name=course_name,
            course_description=course_description,
            status="inactive",
        )
        db.session.add(newCourse)
        db.session.commit()
        return jsonify({"message": "Course created successfully"}), 201
    return jsonify({"error": "Name or description can't be empty"})
