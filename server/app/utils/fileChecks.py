ALLOWED_EXTENSIONS = {"pdf", "docx", "jpg", "png"}  # Define allowed file extensions
def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
