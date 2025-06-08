import logging
import os
from json import dumps
from uuid import uuid4
import bleach
from flask import jsonify, session
from sqlalchemy.exc import IntegrityError
from werkzeug.utils import secure_filename

from datetime import datetime
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
                        filename = str(uuid4()) + secure_filename(file_obj.filename)
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
            {"form": list(requirementForm.to_dict().items()), "files": __files}
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


def saveApplicationComment(application_id, comment):
    application = Applications.query.get_or_404(application_id)
    author = session.get("user", {}).get("role", "")
    if application and author:
        comments = application.comments or []
        comment = {
            "text": bleach.clean(comment, tags=[], strip=True),
            "author": author,
            "timestamp": datetime.utcnow().isoformat(timespec="milliseconds") + "Z",
        }
        comments.append(comment)
        application.comments = comments
        db.session.commit()
        return jsonify({"message": "Commented", "comment": comment}), 201
    return jsonify({"error": "Missing Information"}), 401


validTransitions = {
    "Application": {
        "Pending": ["Under Review", "Editable"],
        "Under Review": ["Fulfilled", "Rejected", "Editable"],
        "Editable": ["Under Review"],
        "Fulfilled": [],
        "Rejected": [],
    },
    "Exam": {
        "Pending": ["Scheduled"],
        "Scheduled": ["Attempted", "Missed"],
        "Attempted": ["Grading"],
        "Grading": ["Graded"],
        "Graded": ["Result Published"],
        "Result Published": [],
    },
    "Interview": {
        "Pending": ["Scheduled"],
        "Scheduled": ["Attempted", "Missed"],
        "Attempted": ["Result Published"],
        "Missed": ["Result Published"],
        "Result Published": [],
    },
}


def checkValidTransition(label, oldStatus, newStatus):
    return newStatus in validTransitions.get(label, {}).get(oldStatus, [])


def statusCook(changeBy, newStatus):
    return {
        "status": newStatus,
        "by": changeBy,
        "at": datetime.utcnow().isoformat(),
    }


def applicationStatus(application_id, label, newStatus, changeBy):
    application = Applications.query.get_or_404(application_id)
    if not application:
        return jsonify({"error": "application not found"})
    if label == "Application":
        oldStatus = application.status[-1]["status"]
        print(oldStatus)
        if checkValidTransition(label=label, oldStatus=oldStatus, newStatus=newStatus):
            status = application.status
            status.append(statusCook(changeBy=changeBy, newStatus=newStatus))
            application.status = status
            db.session.commit()
            return jsonify({"message": "Status updated"}), 201
        return jsonify({"error": "Can't transition to new status"}), 401

    elif label == "Exam":
        oldStatus = application.exam_status[-1]["status"]
        if checkValidTransition(label=label, oldStatus=oldStatus, newStatus=newStatus):
            status = application.exam_status
            status.append(statusCook(changeBy=changeBy, newStatus=newStatus))
            application.exam_status = status
            db.session.commit()
            return jsonify({"message": "Status updated"}), 201
        return jsonify({"error": "Can't transition to new status"}), 401

    elif label == "Interview":
        oldStatus = application.interview_status[-1]["status"]
        if checkValidTransition(label=label, oldStatus=oldStatus, newStatus=newStatus):
            status = application.interview_status
            status.append(statusCook(changeBy=changeBy, newStatus=newStatus))
            application.interview_status = status
            db.session.commit()
            return jsonify({"message": "Status updated"}), 201
        return jsonify({"error": "Can't transition to new status"}), 401
