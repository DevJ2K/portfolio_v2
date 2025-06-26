from app.services.AI.ConversationHandler import ConversationHandler
from app.services.AI.RAG import RAG
from app.models.core.ChatMessage import ChatMessage
from app.models.core.LLM.MistralInput import MistralInput
from mistralai import Mistral, CompletionEvent
from app.utils.logger import ai_logger


class AiService:
    def __init__(self, rag: RAG, api_key: str, context_size: int = 3) -> None:
        self.client = Mistral(api_key=api_key)
        self.rag = rag
        self.context_size = context_size
        # model="open-mistral-7b",  # 5/10, mais pas assez rédirigé
        # model="open-mixtral-8x7b",  # 6/10, mais tjrs en anglais
        # model="open-mixtral-8x22b",  # 8/10, pas mal
        # model="mistral-large-2402",  # 10/10, Pas malllll !!
        # model="devstral-small-latest",
        self.model = "mistral-medium-latest"

    def enrich(self, messages: list[ChatMessage], query: str) -> list[ChatMessage]:
        ai_logger.info(f"Enriching conversation with query: '{query}'")
        return ConversationHandler.get_context(self.rag, messages, query, self.context_size)

    def ask(self, messages: list[ChatMessage]):
        conversation_handler = ConversationHandler()
        conversation: list[MistralInput] = conversation_handler.build(messages=messages)

        try:
            response_stream = self.client.chat.stream(
                model=self.model,
                messages=conversation
            )
            response = ""

            if hasattr(response_stream, '__iter__'):
                for event in response_stream:
                    if isinstance(event, CompletionEvent):
                        delta = event.data.choices[0].delta
                        if delta and delta.content:
                            token = delta.content
                            response += token
                            yield token

                ai_logger.info(f"New interaction:\nAsk: {conversation[-1].get('content', None)}\n\nResponse: {response}")

            else:
                ai_logger.warning("Stream not iterable, falling back to non-streaming")
                regular_response = self.client.chat.complete(
                    model=self.model,
                    messages=conversation
                )
                content = regular_response.choices[0].message.content
                response = content
                yield content
                ai_logger.info(f"New interaction:\nAsk: {conversation[-1].get('content', None)}\n\nResponse: {response}")

        except Exception as e:
            ai_logger.error(f"Error in streaming: {e}")
            try:
                regular_response = self.client.chat.complete(
                    model=self.model,
                    messages=conversation
                )
                content = regular_response.choices[0].message.content
                yield content
                ai_logger.info(f"Fallback response: {content}")
            except Exception as fallback_error:
                ai_logger.error(f"Fallback also failed: {fallback_error}")
                yield "<span class='text-red-500'>I'm sorry, I couldn't process your request right now. Please try again in a moment.</span>"


if __name__ == "__main__":
    from pathlib import Path
    from app.models.core.RagDataset import RagDataset
    from app.models.core.ChunkFormat import ChunkFormat
    import os
    import dotenv

    dotenv.load_dotenv()
    api_key = os.getenv("MISTRAL_API_KEY")

    # print(api_key)
    # exit(1)

    # rag = RAG([
    #     RagDataset(Path(__file__).parent.parent / "data" / "life-timeline.txt", splitter="paragraphs")
    # ])

    data_folder = Path(__file__).parent.parent / "data"

    rag = RAG(datasets=[
        RagDataset(path=data_folder / "42cursus.txt", chunkFormat=ChunkFormat(datatype="text", splitter="paragraphs")),
        RagDataset(path=data_folder / "projects.json", chunkFormat=ChunkFormat(datatype="json")),
        RagDataset(path=data_folder / "experiences.json", chunkFormat=ChunkFormat(datatype="json")),
        RagDataset(path=data_folder / "educations.json", chunkFormat=ChunkFormat(datatype="json")),
        RagDataset(path=data_folder / "skills.json", chunkFormat=ChunkFormat(datatype="json")),
    ])

    ai_service = AiService(rag=rag, api_key=api_key)

    # conversation: list[ChatMessage] = [
    #     {
    #         "role": "user",
    #         "content": "Salut, ça va ?",
    #         "context": ["Le contexte", "Le contexte"]
    #     },
    #     {
    #         "role": "assistant",
    #         "content": "Je vais super bien et toi ? Comment puis-je t'aider ?"
    #     },
    #     {
    #         "role": "user",
    #         "content": "Dis-moi",
    #         "context": ["Le contexte", "Un autre"]
    #     },
    #     {
    #         "role": "assistant",
    #         "content": "Oui?"
    #     }
    # ]
    conversation = []

    conversation = ai_service.enrich(messages=conversation, query="En combien de temps Theo a-t-il terminé le cursus de 42 ?")

    conversation_handler = ConversationHandler()
    conversation_build: list[MistralInput] = conversation_handler.build(messages=conversation)

    print("=" * 40)
    print("Enriched conversation:")
    for msg in conversation_build:
        print(f"{msg['role']}: {msg['content']}")
    # for bloc in ai_service.ask(messages=conversation):
    #     print(bloc, end="", flush=True)
