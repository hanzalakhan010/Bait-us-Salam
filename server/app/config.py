from uuid import uuid4


class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:pos-72270@localhost/bwt"
    DEBUG = True
    SECRET_KEY = "3c0f64f9-5d65-4f09-98b8-7417be0cc83c"


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


