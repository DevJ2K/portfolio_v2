from fastapi import APIRouter, HTTPException, status
from app.models.API.Models import ContactModel
from app.services.ContactService import ContactService
from app.configuration.Configuration import CONFIGURATION
from app.services.Contact.Providers import DiscordProvider


router = APIRouter()

contact_service = ContactService(
    email_receiver=CONFIGURATION.EMAIL_RECEIVER,
    email_sender=CONFIGURATION.EMAIL_SENDER,
    password_sender=CONFIGURATION.PASSWORD_SENDER,
    providers=[
        DiscordProvider(webhook_url=CONFIGURATION.DISCORD_WEBHOOK_URL)
])

@router.post('/send', description="Send a contact message")
async def contact(body: ContactModel):
    if not contact_service.send(email=body.email, title=body.title, message=body.message):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send the contact message."
        )
