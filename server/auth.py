from json import loads


def admin_auth(email, password):
    with open("config.json", "r") as config:
        config = loads(config.read())
        admin = config.get("admin")
        if email == admin.get("email") and password == admin.get("password"):
            return True
    return False


def role_management(role, role_required):
    if role == "admin":
        return True
    if role == "instructor" and role_required in ["student", "instructor"]:
        return True
    if role == role_required == "student":
        return True
    return False
