from Flask import flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import UniqueConstraint


app = flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:pos-72270@localhost/bwt"
db = SQLAlchemy(app)

class Students(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer,primary_key = True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    docs_folder = db.Column(db.String(20))
    age = db.Column(db.Integer)
    address = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    email = db.Column(db.String(50))
    password = db.Column(db.String(20))
    __table_args__ = (UniqueConstraint('email'),)
    
    

class Courses(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer,primary_key = True)
    course_name = db.Column(db.String(20))
    course_description = db.Column(db.String(100))
    instructor_id = db.Column(db.Integer,db.ForeignKey('instructors.id'))
    instructor = db.relationship('Instructors',backref='courses')
    status = db.Column(db.String(20))
    timings = db.Column(db.JSON)


    

class Instructors(db.Model):
    __tablename__ = "instructors"
    id = db.Column(db.Integer,primary_key = True)
    instructor_name = db.Column(db.String(20))
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    email = db.Column(db.String(50))
    password = db.Column(db.String(20))
    phone = db.Column(db.String(10))
    bio = db.Column(db.String(100))
    status = db.Column(db.String(20))
    __table_args__ = (UniqueConstraint('email'),)

class Applications(db.Model):
    __tablename__ = "applications"
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    application_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(20), nullable=True)
    comments = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
    additional_info = db.Column(db.JSON)
    student = db.relationship('Students', backref='applications')
    course = db.relationship('Courses', backref='applications')
    

with app.app_context():
    db.create_all()
    db.session.commit()


if __name__ == "__main__":
    app.run(debug=True)
