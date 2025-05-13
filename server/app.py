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
    phone = db.Column(db.String(15))
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
            "last_name": self.last_name,
            "first_name": self.first_name,
            "docs_folder": self.docs_folder,
            "email": self.email,
        }

    def __repr__(self):
        return f"<Student> {self.id}"


class Courses(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(20))
    course_description = db.Column(db.String(100))
    instructor_id = db.Column(db.Integer, db.ForeignKey("instructors.id"))
    instructor = db.relationship("Instructors", backref="courses")
    status = db.Column(db.String(20))
    timings = db.Column(db.JSON)
    def to_dict_short(self):
        return {
            "id": self.id,
            "course_name": self.course_name,
            "status": self.status,
            "timings": self.timings,
        }
    def to_dict(self):
        return {
            "id": self.id,
            "course_name": self.course_name,
            "course_description": self.course_description,
            "instructor_id": self.instructor_id,
            "status": self.status,
            "timings": self.timings,
        }


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


@app.route("/api/v1/students", methods=["GET", "POST"])
def StudentsManagment():
    if request.method == "GET":
        students = Students.query.all()
        return (
            jsonify({"students": [student.to_dict_short() for student in students]}),
            200,
        )
    elif request.method == "POST":
        first_name = request.json.get("first_name")
        last_name = request.json.get("last_name")
        cnic = request.json.get("cnic")
        father_cnic = request.json.get("father_cnic")
        age = request.json.get("age")
        address = request.json.get("address")
        phone = request.json.get("phone")
        email = request.json.get("email")
        password = request.json.get("password")
        if Students.query.filter_by(email=email).first():
            return jsonify({"error": "Email already registered"}), 400
        # try:
        newStudent = Students(
            first_name=first_name,
            last_name=last_name,
            cnic=cnic,
            father_cnic=father_cnic,
            age=age,
            address=address,
            phone=phone,
            email=email,
            password=password,
        )
        db.session.add(newStudent)
        db.session.commit()
        return jsonify({"message": "Student added successfully"}), 201
        # except:
        #     db.session.rollback()
        #     return jsonify({"error": "Can not add student at the moment"}),400

    elif request.method == "PATCH":
        ...


@app.route("/api/v1/student/<int:student_id>", methods=["GET", "PATCH", "DELETE"])
def StudentManagmentById(student_id):
    student = Students.query.get_or_404(student_id)
    if request.method == "GET":
        return jsonify(student.to_dict()), 200

    elif request.method == "PATCH":
        data = request.json
        print(data)
        for key, value in data.items():
            if hasattr(student, key):
                setattr(student, key, value)
        db.session.commit()
        return jsonify({"message": "Student updated successfully"}), 200

    elif request.method == "DELETE":
        db.session.delete(student)
        db.session.commit()
        return jsonify({"message": "Student deleted successfully"}), 200


@app.route("/api/v1/courses", methods=["GET", "POST"])
def CourseManagment():
    if request.method == "GET":
        courses = Courses.query.all()
        return ...
    elif request.method == "POST":
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
