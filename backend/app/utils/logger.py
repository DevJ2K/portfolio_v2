import logging
from datetime import datetime, timezone, timedelta


class CustomFormatter(logging.Formatter):

    def format(self, record):
        record.levelname = f"[{record.levelname}]".ljust(11)
        record.name = f"{record.name}".ljust(13)
        return super().format(record)


class CustomTimeFormatter(CustomFormatter):
    def formatTime(self, record, datefmt=None):
        tz = timezone(timedelta(hours=2))
        dt = datetime.fromtimestamp(record.created, tz)
        if datefmt:
            return dt.strftime(datefmt)
        return dt.isoformat()


def get_logger(level, name: str = "db.logger") -> logging.Logger:
    logger = logging.getLogger(name.ljust(15))
    logger.setLevel(level)

    ch = logging.StreamHandler()
    ch.setLevel(level)

    file_adjustement = "(%(filename)s:%(lineno)d)".ljust(10)
    # file_adjustement = "({filename}:{lineno})".format(
    #     filename="%(filename)-30s", lineno="%(lineno)d"
    # ).ljust(20)
    formatter = CustomTimeFormatter(
        fmt=f"%(asctime)s - %(levelname)s - %(name)s - {file_adjustement} - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    ch.setFormatter(formatter)

    if not logger.handlers:
        logger.addHandler(ch)

    return logger


# Logger for the application
main_logger = get_logger(logging.DEBUG, "main.logger")
rag_logger = get_logger(logging.DEBUG, "RAG.logger")
contact_logger = get_logger(logging.DEBUG, "contact.logger")
ai_logger = get_logger(logging.INFO, "AI.logger")
api_logger = get_logger(logging.DEBUG, "API.logger")
