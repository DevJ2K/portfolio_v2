import smtplib
import os
import re
import dotenv
from email.message import EmailMessage
from app.utils.logger import contact_logger


class ContactService:
    def __init__(self, email_receiver: str, email_sender: str, password_sender: str) -> None:
        self.EMAIL_RECEIVER = email_receiver
        self.EMAIL_SENDER = email_sender
        self.PASSWORD_SENDER = password_sender

    def __input_validation(self, email: str, title: str, message: str) -> bool:
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            contact_logger.error(f"Invalid email format: {email}")
            raise ValueError("Invalid email format.")
        if not title or not message:
            contact_logger.error("Title and message cannot be empty.")
            raise ValueError("Title and message cannot be empty.")
        return True

    def send(self, email: str, title: str, message: str) -> bool:
        if not self.__input_validation(email, title, message):
            raise ValueError("Input validation failed.")
        return self.__send_via_smtplib(email, title, message)

    def __send_via_smtplib(self, email: str, title: str, message: str) -> bool:
        msg = EmailMessage()
        msg['Subject'] = f"[New contact message] : {title}"
        msg['From'] = self.EMAIL_SENDER
        msg['To'] = self.EMAIL_RECEIVER
        msg.set_content(f"Sender: {email}\n\nBody: {message}")

        try:
            with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
                smtp.starttls()
                smtp.login(self.EMAIL_SENDER, self.PASSWORD_SENDER)
                smtp.send_message(msg)
            contact_logger.debug(f"Message from '{email}' has been sucsessfully sent with title -> '{title}'")
            return True
        except Exception as e:
            contact_logger.error(f"Failed to send message: {e}")
            return False

if __name__ == "__main__":
    dotenv.load_dotenv()
    contact_service = ContactService(
        email_receiver="spamboxdetheo@gmail.com",
        email_sender=os.getenv("EMAIL_SENDER"),
        password_sender=os.getenv("PASSWORD_SENDER"))

    contact_service.send("myemail@taunt.fr", "Test", "Salut !")

