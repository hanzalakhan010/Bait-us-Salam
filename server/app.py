from Flask import flask
from flask_sqlalchemy import SQLAlchemy


app = flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:pos-72270@localhost/bwt"
db = SQLAlchemy(app)

class Students(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    



with app.app_context():
    db.create_all()
    db.session.commit()


if __name__ == "__main__":
    app.run(debug=True)
