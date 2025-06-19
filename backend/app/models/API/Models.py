from pydantic import BaseModel, EmailStr
from app.models.core.ChatMessage import ChatMessage


class ConversationModel(BaseModel):
    conversation: list[ChatMessage]


class EnrichmentModel(BaseModel):
    conversation: list[ChatMessage]
    prompt: str

class ContactModel(BaseModel):
    email: EmailStr
    title: str
    message: str
