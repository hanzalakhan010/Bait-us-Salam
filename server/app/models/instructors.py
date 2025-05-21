from app.models import db
class Instructors(db.Model):
    __tablename__ = "instructors"
    id = db.Column(db.Integer, primary_key=True)
    instructor_name = db.Column(db.String(20))
    email = db.Column(db.String(50))
    password = db.Column(db.String(20))
    phone = db.Column(db.String(15))
    bio = db.Column(db.String(100))
    status = db.Column(db.String(20))
    __table_args__ = (db.UniqueConstraint("email"),)
    def to_dict_short(self):
        return {
            "id":self.id,
            "instructor_name":self.instructor_name,
            "phone":self.phone
        }