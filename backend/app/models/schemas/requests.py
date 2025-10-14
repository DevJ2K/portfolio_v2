from pydantic import BaseModel, EmailStr
from app.models.core.ChatMessage import ChatMessage


class ConversationRequest(BaseModel):
    conversation: list[ChatMessage]


class ContactRequest(BaseModel):
    email: EmailStr
    title: str
    message: str
