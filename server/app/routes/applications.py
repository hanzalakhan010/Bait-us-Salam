from flask import Blueprint, request
from app.services.applications import allApplications
from app.services.auth import AuthRequired

application_blueprint = Blueprint("applications", __name__)


@AuthRequired(min_level=1)
@application_blueprint.route("/", methods=["GET"])
def ApplciationManagement():
    if request.method == "GET":
        filters = request.args.to_dict()
        return allApplications(filters=filters)
