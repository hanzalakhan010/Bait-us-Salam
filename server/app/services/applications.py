import logging
import os
from json import dumps

from flask import jsonify
from sqlalchemy.exc import IntegrityError
from werkzeug.utils import secure_filename

from app.models import db
from app.models.applications import Applications
from app.services.students import studentDocsFolder

logger = logging.getLogger(__name__)


def allApplications(filters: dict):
    applications = Applications.query.filter_by(**filters)
    return (
        jsonify(
            {
                "applications": [
                    application.to_dict_short() for application in applications
                ]
            }
        ),
        200,
    )


def addApplication(
    requirementForm, course_id, student_id="", applicant_id="", files={}
):
    from app import UPLOAD_FOLDER

    try:
        # Validate input
        if not course_id or not (student_id or applicant_id):
            logger.warning("Course ID or Applicant is missing")
            return jsonify({"error": "Course or Applicant can't be empty"}), 400

        # Create a new application instance
        newApplication = Applications(course_id=course_id)
        __files = []

        # Handle file uploads
        if files:
            try:
                docs_folder = str(studentDocsFolder(student_id=student_id))
                os.makedirs(os.path.join(UPLOAD_FOLDER, docs_folder), exist_ok=True)
                for file_key, file_obj in files.items():
                    if file_obj:
                        filename = secure_filename(file_obj.filename)
                        filepath = os.path.join(UPLOAD_FOLDER, docs_folder, filename)
                        file_obj.save(filepath)
                        __files.append((file_key, filename))
                        logger.info(f"File saved at {filepath}")
                    else:
                        logger.warning(f"File {file_obj.filename} is not allowed")
            except FileNotFoundError as fnf_error:
                logger.error(f"File handling error: {fnf_error}")
                return jsonify({"error": "Error saving files"}), 500
            except Exception as file_error:
                logger.error(f"Unexpected file handling error: {file_error}")
                return jsonify({"error": "Error processing files"}), 500

        # Add requirements and submitter details
        newApplication.requirements = dumps(
            {"form": requirementForm.to_dict(), "files": __files}
        )
        if student_id:
            newApplication.student_id = int(student_id)
            newApplication.submitted_by_type = "student"
        elif applicant_id:
            newApplication.submitted_by_type = "applicant"

        # Save application to the database
        try:
            db.session.add(newApplication)
            db.session.commit()
            logger.info(f"Application submitted successfully for course_id {course_id}")
            return jsonify({"message": "Application submitted successfully"}), 201
        except IntegrityError as integrity_error:
            db.session.rollback()
            logger.error(f"Database integrity error: {integrity_error}")
            return jsonify({"error": "Duplicate application or invalid data"}), 409
        except Exception as db_error:
            db.session.rollback()
            logger.error(f"Database error: {db_error}")
            return jsonify({"error": "Error saving application to the database"}), 500

    except ValueError as value_error:
        logger.error(f"Value error: {value_error}")
        return jsonify({"error": "Invalid input provided"}), 400
    except Exception as error:
        logger.error(f"Unexpected error: {error}")
        return jsonify({"error": "An unexpected error occurred"}), 500


def applicationById(application_id):
    application = Applications.query.get_or_404(application_id)
    if application:
        return (
            jsonify(
                {
                    "application": {
                        **application.to_dict(),
                        "submitter": application.submitter.to_dict_short(),
                    }
                }
            ),
            200,
        )
    else:
        return jsonify({"error": "Application not found"})
