from app.services.Contact.NotificationProvider import NotificationProvider
import requests
from datetime import datetime
from zoneinfo import ZoneInfo
from email.message import EmailMessage
from app.utils.logger import contact_logger
import smtplib

# class SendGridProvider(NotificationProvider):
#     def __init__(self, api_key: str, from_email: str, to_email: str):
#         self.api_key = api_key
#         self.from_email = from_email
#         self.to_email = to_email

#     def send(self, email: str, title: str, message: str) -> bool:
#         url = "https://api.sendgrid.com/v3/mail/send"
#         headers = {
#             "Authorization": f"Bearer {self.api_key}",
#             "Content-Type": "application/json"
#         }
#         data = {
#             "personalizations": [{
#                 "to": [{"email": self.to_email}]
#             }],
#             "from": {"email": self.from_email},
#             "subject": f"[New contact message] : {title}",
#             "content": [{
#                 "type": "text/html",
#                 "value": f"<strong>Sender:</strong> {email}<br><br><strong>Message:</strong><br>{message.replace(chr(10), '<br>')}"
#             }]
#         }

#         try:
#             response = requests.post(url, json=data, headers=headers, timeout=10)
#             return response.status_code == 202
#         except Exception as e:
#             print(f"SendGrid error: {e}")
#             return False

# class MailgunProvider(NotificationProvider):
#     def __init__(self, api_key: str, domain: str, from_email: str, to_email: str):
#         self.api_key = api_key
#         self.domain = domain
#         self.from_email = from_email
#         self.to_email = to_email

#     def send(self, email: str, title: str, message: str) -> bool:
#         url = f"https://api.mailgun.net/v3/{self.domain}/messages"

#         try:
#             response = requests.post(
#                 url,
#                 auth=("api", self.api_key),
#                 data={
#                     "from": self.from_email,
#                     "to": self.to_email,
#                     "subject": f"[New contact message] : {title}",
#                     "text": f"Sender: {email}\n\nMessage: {message}"
#                 },
#                 timeout=10
#             )
#             return response.status_code == 200
#         except Exception as e:
#             print(f"Mailgun error: {e}")
#             return False

class DiscordProvider(NotificationProvider):
    def __init__(self, webhook_url: str):
        self.webhook_url = webhook_url

    def send(self, email: str, title: str, message: str) -> bool:
        data = {
            "embeds": [{
                "title": "📧 Nouveau message de contact",
                "color": 0x00ff00,
                "fields": [
                    {"name": "De", "value": email, "inline": True},
                    {"name": "Sujet", "value": title, "inline": True},
                    {"name": "Message", "value": message, "inline": False}
                ],
                "timestamp": datetime.now(tz=ZoneInfo("Europe/Paris")).isoformat()
            }],
            "content": "@everyone Nouveau message reçu !",
            "allowed_mentions": {
                "parse": ["everyone"]
            }
        }

        try:
            response = requests.post(self.webhook_url, json=data, timeout=10)
            return response.status_code == 204
        except Exception as e:
            contact_logger.error(f"Discord error: {e}")
            return False

class SmtpProvider(NotificationProvider):
    def __init__(self, email_sender: str, password_sender: str, email_receiver: str):
        self.EMAIL_SENDER = email_sender
        self.PASSWORD_SENDER = password_sender
        self.EMAIL_RECEIVER = email_receiver

    def send(self, email: str, title: str, message: str) -> bool:
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
            return True
        except Exception as e:
            contact_logger.error(f"Smtp error: {e}")
            return False

# class SlackProvider(NotificationProvider):
#     def __init__(self, webhook_url: str):
#         self.webhook_url = webhook_url

#     def send(self, email: str, title: str, message: str) -> bool:
#         data = {
#             "text": "📧 Nouveau message de contact",
#             "attachments": [{
#                 "color": "good",
#                 "fields": [
#                     {"title": "De", "value": email, "short": True},
#                     {"title": "Sujet", "value": title, "short": True},
#                     {"title": "Message", "value": message, "short": False}
#                 ]
#             }]
#         }

#         try:
#             response = requests.post(self.webhook_url, json=data, timeout=10)
#             return response.status_code == 200
#         except Exception as e:
#             print(f"Slack error: {e}")
#             return False

# class TelegramProvider(NotificationProvider):
#     def __init__(self, bot_token: str, chat_id: str):
#         self.bot_token = bot_token
#         self.chat_id = chat_id

#     def send(self, email: str, title: str, message: str) -> bool:
#         url = f"https://api.telegram.org/bot{self.bot_token}/sendMessage"

#         text = f"🔔 *Nouveau message de contact*\n\n*De:* {email}\n*Sujet:* {title}\n*Message:* {message}"

#         data = {
#             "chat_id": self.chat_id,
#             "text": text,
#             "parse_mode": "Markdown"
#         }

#         try:
#             response = requests.post(url, data=data, timeout=10)
#             return response.status_code == 200
#         except Exception as e:
#             print(f"Telegram error: {e}")
#             return False
