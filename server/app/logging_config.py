import logging
import logging.config
import os

# Define a logging configuration
LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        },
        "detailed": {
            "format": "%(asctime)s - %(name)s - %(levelname)s - %(pathname)s:%(lineno)d - %(message)s",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "default",
        },
        "file": {
            "class": "logging.FileHandler",
            "formatter": "detailed",
            "filename": os.path.join("logs", "app.log"),
        },
    },
    "root": {
        "level": "INFO",
        "handlers": ["console", "file"],
    },
}


# Apply the logging configuration
def setup_logging():
    os.makedirs("logs", exist_ok=True)  # Ensure the logs directory exists
    logging.config.dictConfig(LOGGING_CONFIG)
