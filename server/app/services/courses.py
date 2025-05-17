from app.models import db
from app.models.courses import Courses


def getAllCourses():
    courses = Courses.query.all()
    return [course.to_dict() for course in courses], 200
