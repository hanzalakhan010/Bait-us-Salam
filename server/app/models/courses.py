from app.models import db


class Courses(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(20))
    course_description = db.Column(db.String(100))
    status = db.Column(db.String(20))

    def to_dict_short(self):
        return {
            "id": self.id,
            "course_name": self.course_name,
            "status": self.status,
        }

    def to_dict(self):
        return {
            "id": self.id,
            "course_name": self.course_name,
            "course_description": self.course_description,
            "status": self.status,
        }


class CourseSection(db.Model):
    __tablename__ = "course_sections"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20))
    instructor_id = db.Column(db.Integer, db.ForeignKey("instructors.id"))
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))
    timings = db.Column(db.JSON)
    course = db.relationship(Courses, backref="course_sections")
    instructor = db.relationship("Instructors", backref="course_sections")


class Announcements(db.Model):
    __tablename__ = "announcements"
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200))
    date = db.Column(db.Date)
    course_section_id = db.Column(db.Integer, db.ForeignKey("course_sections.id"))
    course_section = db.relationship("CourseSection", backref="announcements")


"""

EXAMS {
    integer id PK
    integer course_section FK
    title text
    date date
    link text
}
"""


class Exams(db.Model):
    __tablename__ = "exams"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    link = db.Column(db.String(200))
    course_section_id = db.Column(db.Integer, db.ForeignKey("course_sections.id"))
    course_section = db.relationship("CourseSection", backref="exams")


class CourseSession(db.Model):
    __tablename__ = "course_session"
    id = db.Column(db.Integer, primary_key=True)
    course_section_id = db.Column(db.Integer, db.ForeignKey("course_sections.id"))
    date = db.Column(db.Date)
    topic = db.Column(db.String(100))
    instructor_notes = db.Column(db.String(100))
    is_cancelled = db.Column(db.Boolean, default=False)
    course_section = db.relationship("CourseSection", backref="course_session")


class CourseEnrollment(db.Model):
    __tablename__ = "course_enrollments"
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    course_section_id = db.Column(db.Integer, db.ForeignKey("course_sections.id"))
    date = db.Column(db.Date)
    student = db.relationship("Students", backref="course_enrollments")
    course = db.relationship("Courses", backref="course_enrollments")
