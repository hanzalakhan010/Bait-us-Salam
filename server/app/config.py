from uuid import uuid4


class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:pos-72270@localhost/bwt"
    DEBUG = True
    SECRET_KEY = str(uuid4())
