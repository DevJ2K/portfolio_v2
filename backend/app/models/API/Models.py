from pydantic import BaseModel
from app.models.core.ChatMessage import ChatMessage


class ConversationModel(BaseModel):
    conversation: list[ChatMessage]


class EnrichmentModel(BaseModel):
    conversation: list[ChatMessage]
    prompt: str
