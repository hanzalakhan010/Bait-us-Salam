from app.models import db
from app.models.students import Students


def getAllStudents():
    students = Students.query.all()
    return [student.to_dict_short() for student in students]


def editStudentById(student_id, data):
    student = Students.query.get_or_404(student_id)
    for key, value in data.items():
        if hasattr(student, key):
            setattr(student, key, value)
    db.session.commit()


def removeStudentById(student_id):
    student = Students.query.get_or_404(student_id)
    db.session.remove(student)
    db.session.commit()


def getStudentById(student_id):
    student = Students.query.get_or_404(student_id)
    return student.to_dict()


def registerStudent(studentDetails): ...
