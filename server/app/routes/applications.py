from flask import Blueprint, request
from app.services.applications import allApplications, applicationById
from app.services.auth import AuthRequired

application_blueprint = Blueprint("applications", __name__)


@AuthRequired(min_level=1)
@application_blueprint.route("/", methods=["GET"])
def ApplciationManagement():
    if request.method == "GET":
        filters = request.args.to_dict()
        return allApplications(filters=filters)


@application_blueprint.route("/<int:application_id>", methods=["GET", "PATCH"])
@AuthRequired(method_levels={"GET": 2, "PATCH": 1})
def ApplicationById(application_id):
    if request.method == "GET":
        return applicationById(application_id=application_id)
