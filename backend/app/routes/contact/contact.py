from fastapi import APIRouter
from app.models.API.Models import ContactModel
from app.services.ContactService import ContactService
from app.configuration.Configuration import CONFIGURATION


router = APIRouter()

contact_service = ContactService(
    email_receiver=CONFIGURATION.EMAIL_RECEIVER,
    email_sender=CONFIGURATION.EMAIL_SENDER,
    password_sender=CONFIGURATION.PASSWORD_SENDER)

@router.post('/send', description="Send a contact message")
async def contact(body: ContactModel):
    contact_service.send(email=body.email, title=body.title, message=body.message)
