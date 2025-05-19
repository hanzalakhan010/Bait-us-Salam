from app.services.instructors import getAllActiveInstructors, addInstructor
from flask import Blueprint, request


instructors_blueprint = Blueprint("instructors", __name__)


@instructors_blueprint.route("/", methods=["GET"])
def InstructorsManagement():
    if request.method == "GET":
        return getAllActiveInstructors()
    elif request.method == "POST":
        return addInstructor(instructor_details=request.json)
