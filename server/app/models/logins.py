from app.models import db
from datetime import datetime, timedelta


def default_expiry():
    return datetime.utcnow() + timedelta(days=2)


"""
Role levels

1 == (ADMIN)
2 == (INSTRUCTOR)(CAN MAKE MINOR CHANGES)
3 == (STUDENT)(CAN REPORT OR COMMENT)
4 == (APPLICANT)(NO DATA MODIFIED BY THIS AND ONLY RESTRICTED ACCESS)

"""


class Logins(db.Model):
    __tablename__ = "logins"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role = db.Column(db.String(50), nullable=False)
    role_level = db.Column(db.Integer, default=4)
    token = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(40), nullable=False)
    issued_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False, default=default_expiry)
    is_active = db.Column(db.Boolean, default=True, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "role": self.role,
            "email": self.email,
            "role_level": self.role_level,
            "issued_at": self.issued_at.isoformat(),
            "expires_at": self.expires_at.isoformat(),
            "is_active": self.is_active,
        }
