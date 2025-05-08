from json import loads


def admin_auth(email, password):
    with open("config.json", "r") as config:
        config = loads(config.read())
        admin = config.get("admin")
        if email == admin.get("email") and password == admin.get("password"):
            return True
    return False
