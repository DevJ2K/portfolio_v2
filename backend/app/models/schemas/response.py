from pydantic import BaseModel
from app.models.core.ChatMessage import ChatMessage


class ConversationResponse(BaseModel):
    conversation: list[ChatMessage]


class EnrichmentResponse(BaseModel):
    conversation: list[ChatMessage]
    prompt: str
