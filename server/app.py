from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import UniqueConstraint

import auth


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:pos-72270@localhost/bwt"
db = SQLAlchemy(app)
CORS(app)


class Students(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    cnic = db.Column(db.String(20))
    father_cnic = db.Column(db.String(20))
    docs_folder = db.Column(db.String(20))
    age = db.Column(db.Integer)
    address = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    email = db.Column(db.String(50))
    password = db.Column(db.String(20))
    __table_args__ = (UniqueConstraint("email"),)

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "docs_folder": self.docs_folder,
            "age": self.age,
            "cnic":self.cnic,
            "address": self.address,
            "phone": self.phone,
            "email": self.email,
            "password": self.password,
        }

    def to_dict_short(self):
        return {
            "id": self.id,
            "last_name": self.last_name,
            "docs_folder": self.docs_folder,
            "email": self.email,
        }


class Courses(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(20))
    course_description = db.Column(db.String(100))
    instructor_id = db.Column(db.Integer, db.ForeignKey("instructors.id"))
    instructor = db.relationship("Instructors", backref="courses")
    status = db.Column(db.String(20))
    timings = db.Column(db.JSON)


class Instructors(db.Model):
    __tablename__ = "instructors"
    id = db.Column(db.Integer, primary_key=True)
    instructor_name = db.Column(db.String(20))
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    email = db.Column(db.String(50))
    password = db.Column(db.String(20))
    phone = db.Column(db.String(10))
    bio = db.Column(db.String(100))
    status = db.Column(db.String(20))
    __table_args__ = (UniqueConstraint("email"),)


class Applications(db.Model):
    __tablename__ = "applications"
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), nullable=False)
    application_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(20), nullable=True)
    comments = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
    additional_info = db.Column(db.JSON)
    student = db.relationship("Students", backref="applications")
    course = db.relationship("Courses", backref="applications")


with app.app_context():
    db.create_all()
    db.session.commit()


@app.route("/api/v1/students", methods=["GET", "POST", "PATCH"])
def StudentsManagment():
    if request.method == "GET":
        students = Students.query.all()
        return (
            jsonify({"students": [student.to_dict_short() for student in students]}),
            200,
        )
    elif request.method == "POST":
        ...
    elif request.method == "PATCH":
        ...


@app.route("/api/v1/admin/login", methods=["POST"])
def admin_login():
    email = request.json.get("email")
    password = request.json.get("password")
    if not (email or password):
        return jsonify({"error": "Email and Password are required"}), 401
    if not auth.admin_auth(email=email, password=password):
        return jsonify({"error": "Email and Password do not match"}), 401
    return jsonify({"message": "Auth successfull"}), 200


if __name__ == "__main__":
    app.run(debug=True)
