import smtplib
import os
import re
import dotenv
from email.message import EmailMessage
from app.utils.logger import contact_logger
from app.services.Contact.NotificationProvider import NotificationProvider
from app.services.Contact.Providers import DiscordProvider, SmtpProvider


class ContactService:
    def __init__(self, email_receiver: str, email_sender: str, password_sender: str, providers: list[NotificationProvider]) -> None:
        self.EMAIL_RECEIVER = email_receiver
        self.EMAIL_SENDER = email_sender
        self.PASSWORD_SENDER = password_sender
        self.providers = providers

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
        sent_status = []
        for provider in self.providers:
            print(f"Trying to send message using {provider.__class__.__name__}")
            try:
                if provider.send(email, title, message):
                    contact_logger.debug(f"Message from '{email}' has been successfully sent with title -> '{title}'")
                    sent_status.append(True)
            except Exception as e:
                contact_logger.error(f"Failed to send message using {provider.__class__.__name__}: {e}")
                sent_status.append(False)
        return any(sent_status)

if __name__ == "__main__":
    dotenv.load_dotenv()
    contact_service = ContactService(
        email_receiver="spamboxdetheo@gmail.com",
        email_sender=os.getenv("EMAIL_SENDER"),
        password_sender=os.getenv("PASSWORD_SENDER"), providers=[
            DiscordProvider(webhook_url=os.getenv("DISCORD_WEBHOOK_URL")),
            SmtpProvider(
                email_sender=os.getenv("EMAIL_SENDER"),
                password_sender=os.getenv("PASSWORD_SENDER"),
                email_receiver=os.getenv('EMAIL_RECEIVER')
            )])

    contact_service.send("myemail@taunt.fr", "Test", "Salut !")

