# app/models/__init__.py

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .students import Students
from .courses import Courses
from .instructors import Instructors
from .applicants import Applicants
from .applications import Applications


# Optional: define __all__ for IDEs and clean imports
__all__ = ["db", "Students", "Courses", "Instructors", "Applicants","Applications"]
