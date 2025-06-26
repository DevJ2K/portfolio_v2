from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.services.AiService import AiService
from app.services.AI.RAG import RAG
from app.configuration.Configuration import CONFIGURATION
from app.models.API.Models import ConversationModel, EnrichmentModel
from app.models.core.RagDataset import RagDataset
from app.models.core.ChunkFormat import ChunkFormat
from app.utils.logger import api_logger
from pathlib import Path
from fastapi import Request


router = APIRouter()

data_folder = Path(__file__).parent.parent.parent / "data"
CONTEXT_SIZE = 7

ai_service = AiService(
    rag=RAG(datasets=[
        RagDataset(path=data_folder / "life-timeline.txt", chunkFormat=ChunkFormat(datatype="text", splitter="paragraphs")),
        RagDataset(path=data_folder / "projects.json", chunkFormat=ChunkFormat(datatype="json")),
        RagDataset(path=data_folder / "experiences.json", chunkFormat=ChunkFormat(datatype="json")),
        RagDataset(path=data_folder / "educations.json", chunkFormat=ChunkFormat(datatype="json")),
        RagDataset(path=data_folder / "skills.json", chunkFormat=ChunkFormat(datatype="json")),
    ]),
    api_key=CONFIGURATION.MISTRAL_API_KEY,
    context_size=CONTEXT_SIZE)


def display_request_info(request: Request, route: str):
    client_host = request.client.host
    headers = request.headers
    api_logger.info(f"Route: '{route}' - Client IP: {client_host} - User-agent: {headers.get('User-Agent', 'Unknown')}")


@router.post('/enrich', description="Add context on your prompt and add it to the conversation.")
async def enrich(body: EnrichmentModel, request: Request) -> ConversationModel:
    display_request_info(request, '/enrich')
    return ConversationModel(
        conversation=ai_service.enrich(messages=body.conversation, query=body.prompt))


@router.post('/ask', description="Ask anything to the LLM.")
async def ask(body: ConversationModel, request: Request) -> StreamingResponse:
    display_request_info(request, '/ask')
    return StreamingResponse(
        ai_service.ask(body.conversation),
        media_type="text/event-stream"
    )
