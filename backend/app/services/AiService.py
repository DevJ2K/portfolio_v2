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
        self.model = "mistral-large-2402"

    def enrich(self, messages: list[ChatMessage], query: str) -> list[ChatMessage]:
        return ConversationHandler.get_context(self.rag, messages, query, self.context_size)

    def ask(self, messages: list[ChatMessage]):
        conversation_handler = ConversationHandler()
        conversation: list[MistralInput] = conversation_handler.build(messages=messages)

        response_stream = self.client.chat.stream(
            model=self.model,
            messages=conversation
        )
        response = ""
        for event in response_stream:
            print(event, flush=True)
            if isinstance(event, CompletionEvent):
                delta = event.data.choices[0].delta
                if delta and delta.content:
                    token = delta.content
                    response += token
                    yield token
        ai_logger.info(f"Response: {response}")


if __name__ == "__main__":
    from pathlib import Path
    import os
    import dotenv

    dotenv.load_dotenv()
    api_key = os.getenv("MISTRAL_API_KEY")

    # print(api_key)
    # exit(1)

    data1 = Path(__file__).parent.parent / "data" / "brut.txt"
    rag = RAG([data1])

    ai_service = AiService(rag=rag, api_key=api_key)

    conversation: list[ChatMessage] = [
        {
            "role": "user",
            "content": "Salut, ça va ?",
            "context": ["Le contexte", "Le contexte"]
        },
        {
            "role": "assistant",
            "content": "Je vais super bien et toi ? Comment puis-je t'aider ?"
        },
        {
            "role": "user",
            "content": "Dis-moi",
            "context": ["Le contexte", "Un autre"]
        },
        {
            "role": "assistant",
            "content": "Oui?"
        }
    ]

    conversation = ai_service.enrich(messages=conversation, query="Qu'est-ce que SFT-R ?")

    for bloc in ai_service.ask(messages=conversation):
        print(bloc, end="", flush=True)
