from sqlalchemy import CheckConstraint
from app.models import db
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Index, text
from datetime import datetime


def initialStatus():
    return [
        {
            "status": "Pending",
            "by": "system",
            "at": datetime.utcnow().isoformat(),
        }
    ]


class Applications(db.Model):
    __tablename__ = "applications"
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=True)
    applicant_id = db.Column(db.Integer, db.ForeignKey("applicants.id"), nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)
    exam_status = db.Column(MutableList.as_mutable(JSONB()), default=initialStatus)
    interview_status = db.Column(MutableList.as_mutable(JSONB), default=initialStatus)
    status = db.Column(MutableList.as_mutable(JSONB), default=initialStatus)
    comments = db.Column(MutableList.as_mutable(JSONB), default=list)
    created_at = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)
    requirements = db.Column(db.JSON)
    is_editable = db.Column(db.Boolean, default=False)
    student = db.relationship("Students", backref="applications")
    applicant = db.relationship("Applicants", backref="application")
    course = db.relationship("Courses", backref="applications")
    submitted_by_type = db.Column(db.String(10), nullable=False)
    __table_args__ = (
        CheckConstraint(
            "(student_id IS NOT NULL AND applicant_id IS NULL) OR (student_id IS NULL AND applicant_id IS NOT NULL)",
            name="check_one_applicant_type",
        ),
        Index(
            "uq_student_per_course",
            "student_id",
            "course_id",
            unique=True,
            postgresql_where=text("student_id IS NOT NULL"),
        ),
        Index(
            "uq_applicant_per_course",
            "applicant_id",
            "course_id",
            unique=True,
            postgresql_where=text("applicant_id IS NOT NULL"),
        ),
    )

    @hybrid_property
    def submitter(self):
        return self.student or self.applicant

    def to_dict(self):
        base = {
            "id": self.id,
            "course_name": self.course.course_name,
            "created_at": self.created_at,
            "requirements": self.requirements,
            "submitted_by": self.submitted_by_type,
            "comments": self.comments,
            "is_editable": self.is_editable,
        }
        if self.applicant_id:
            base["applicant_id"] = self.applicant_id
        elif self.student_id:
            base["student_id"] = self.student_id
        return base

    def to_dict_short(self):
        base = {
            "id": self.id,
            "course_name": self.course.course_name,
            "created_at": self.created_at,
            "exam_status": self.exam_status[-1],
            "interview_status": self.interview_status[-1],
            "status": self.status[-1],
        }
        if self.applicant_id:
            base["applicant_id"] = self.applicant_id
        elif self.student_id:
            base["student_id"] = self.student_id
        return base
