from flask import Blueprint, request, jsonify, session
from app.services.applications import (
    allApplications,
    applicationById,
    saveApplicationComment,
    applicationStatus,
    getApplicationStatus,
)
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


@application_blueprint.route("/<int:application_id>/comment", methods=["POST"])
@AuthRequired(min_level=2)
def ApplicationComment(application_id):
    return saveApplicationComment(
        application_id=application_id, comment=request.json.get("comment", "")
    )


@application_blueprint.route(
    "/<int:application_id>/status/<string:label>", methods=["GET", "POST"]
)
@AuthRequired(min_level=2)
def ApplicatioStatusManagement(application_id, label):
    if request.method == "GET":
        return getApplicationStatus(application_id=application_id, label=label)
    elif request.method == "POST":
        changeBy = session.get("user", {}).get("role", "")
        newStatus = request.json.get("status", "")
        if not label:
            return jsonify({"error": "label is not specified"}), 401
        return applicationStatus(
            application_id=application_id,
            label=label,
            newStatus=newStatus,
            changeBy=changeBy,
        )
