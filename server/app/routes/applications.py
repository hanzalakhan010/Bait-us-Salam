from flask import Blueprint, request
from app.services.applications import addApplication, allApplications


application_blueprint = Blueprint("applications", __name__)


@application_blueprint.route("/", methods=["GET"])
def ApplciationManagement():
    if request.method == "GET":
        filters = request.args.to_dict() 
        return allApplications(filters=filters)
    elif request.method == "POST":
        ...
