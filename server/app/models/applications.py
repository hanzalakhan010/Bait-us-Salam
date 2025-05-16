from app.models import db

class Applications(db.Model):
    __tablename__ = "applications"
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    applicant_id = db.Column(db.Integer, db.ForeignKey("applicants.id"), nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)
    application_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(20), nullable=True, default="pending")
    comments = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
    additional_info = db.Column(db.JSON)
    student = db.relationship("Students", backref="applications")
    applicant = db.relationship("Applicants", backref="application")
    course = db.relationship("Courses", backref="applications")
