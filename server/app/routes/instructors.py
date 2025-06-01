from flask import Blueprint, request

from app.services.auth import AuthRequired
from app.services.instructors import addInstructor, getAllActiveInstructors

instructors_blueprint = Blueprint("instructors", __name__)


@AuthRequired(min_level=1)
@instructors_blueprint.route("/", methods=["GET", "POST"])
def InstructorsManagement():
    if request.method == "GET":
        return getAllActiveInstructors()
    elif request.method == "POST":
        return addInstructor(instructor_details=request.json)
