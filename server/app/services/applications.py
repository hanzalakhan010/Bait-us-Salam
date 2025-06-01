from app.models.applications import Applications
from flask import jsonify
from werkzeug.utils import secure_filename
import os
from app.services.auth import AuthRequired
from app.services.students import studentDocsFolder
from app.models import db
import logging
from json import dumps

logger = logging.getLogger(__name__)


def allApplications(filters: dict):
    applications = Applications.query.filter_by(**filters)
    return (
        jsonify(
            {"applications": [application.to_dict() for application in applications]}
        ),
        200,
    )


def addApplication(requirementForm, files, course_id, student_id="", applicant_id=""):
    from app import UPLOAD_FOLDER

    try:
        if not course_id or not (student_id or applicant_id):
            return jsonify({"error": "Course or Applicant can't be empty"})
        newApplication = Applications(
            course_id=course_id, requirements=dumps(requirementForm.to_dict())
        )
        if files:
            docs_folder = studentDocsFolder(student_id=student_id)
            os.makedirs(os.path.join(UPLOAD_FOLDER, docs_folder), exist_ok=True)
            for file in files.items():
                try:
                    if file[0]:
                        # if file[0] and allowed_file(file[0]):
                        filename = secure_filename(file[1].filename)
                        filepath = os.path.join(UPLOAD_FOLDER, docs_folder, filename)
                        file[1].save(filepath)
                        logger.info(f"File saved at {filepath}")
                except Exception as error:
                    logger.error(f"File not saved {filepath} due to {error}")

        if student_id:
            newApplication.student_id = int(student_id)
            newApplication.submitted_by_type = "student"
        elif applicant_id:
            newApplication.submitted_by_type = "applicant"
        db.session.add(newApplication)
        db.session.commit()
        logger.info(f"Application submitted")
        return jsonify({"message": "Application submitted successfully"}), 201
    except Exception as error:
        db.session.rollback()
        logger.error(f"Application submission error {error}")
        return jsonify({"error": "Error in application submission"}), 401
