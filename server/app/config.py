from uuid import uuid4


class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:pos-72270@localhost/bwt"
    DEBUG = True
    SECRET_KEY = "3c0f64f9-5d65-4f09-98b8-7417be0cc83c"
