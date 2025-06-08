from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.services.AiService import AiService
from app.services.AI.RAG import RAG
from app.configuration.Configuration import CONFIGURATION
from app.models.API.Models import ConversationModel, EnrichmentModel
from pathlib import Path


router = APIRouter()

data_folder = Path(__file__).parent.parent.parent / "data"

ai_service = AiService(
    rag=RAG(datasets=[
        data_folder / "brut.txt"
    ]),
    api_key=CONFIGURATION.MISTRAL_API_KEY,
    context_size=3)


@router.post('/enrich', description="Add context on your prompt and add it to the conversation.")
async def enrich(body: EnrichmentModel) -> ConversationModel:
    return ConversationModel(
        conversation=ai_service.enrich(messages=body.conversation, query=body.prompt))


@router.post('/ask', description="Ask anything to the LLM.")
async def ask(body: ConversationModel) -> StreamingResponse:
    return StreamingResponse(
        ai_service.ask(body.conversation),
        media_type="text/event-stream"
    )
