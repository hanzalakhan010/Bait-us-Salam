from app.models import db
from sqlalchemy.orm import joinedload


class Students(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    father_name = db.Column(db.String(20))
    cnic = db.Column(db.String(20))
    father_cnic = db.Column(db.String(20))
    docs_folder = db.Column(db.String(20))
    dob = db.Column(db.DateTime)
    address = db.Column(db.String(100))
    phone = db.Column(db.String(15))
    email = db.Column(db.String(50), unique=True, index=True)
    password = db.Column(db.String(20))
    __table_args__ = (db.UniqueConstraint("email"),)
    def get_sections(self):
        from app.models.courses import CourseSection, CourseEnrollment

        sections = (
            db.session.query(CourseSection)
            .join(
                CourseEnrollment, CourseSection.id == CourseEnrollment.course_section_id
            )
            .filter(CourseEnrollment.student_id == self.id)
            .options(
                joinedload(CourseSection.course), joinedload(CourseSection.instructor)
            )
            .all()
        )
        return [section.to_dict() for section in sections]

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "docs_folder": self.docs_folder,
            "dob": self.dob,
            "cnic": self.cnic,
            "father_cnic": self.father_cnic,
            "address": self.address,
            "phone": self.phone,
            "email": self.email,
            "password": self.password,
        }

    def to_dict_short(self):
        return {
            "id": self.id,
            "name": self.name,
            "docs_folder": self.docs_folder,
            "email": self.email,
        }

    def to_dict_all(self): ...

    def __repr__(self):
        return f"<Student> {self.id}"
