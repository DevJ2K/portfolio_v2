from pathlib import Path
from app.models.core.ChatMessage import ChatMessage
from app.models.core.LLM.MistralInput import MistralInput
from app.services.AI.RAG import RAG


class ConversationHandler:
    def __init__(self) -> None:
        prompts_folder = Path(__file__).parent.parent.parent / "prompts"
        self.__rag_prompt = self.__load_prompt__(
            prompts_folder / "RAG" / "context_portfolio.txt"
        )

    def __load_prompt__(self, path: Path):
        with open(path, "r") as f:
            content = f.read()
        return content

    @staticmethod
    def get_context(
        rag: RAG, input_messages: list[ChatMessage], query: str, k_context: int = 2
    ) -> list[ChatMessage]:
        messages = input_messages.copy()
        messages.append(
            {
                "role": "user",
                "content": query,
                "context": rag.retrieve(query=query, k=k_context),
            }
        )
        return messages

    def build(self, messages: list[ChatMessage]) -> list[MistralInput]:

        contexts = []
        for chat in messages[-6:]:
            if chat.get("context") is not None:
                contexts.extend(chat["context"])
        contexts = list(dict.fromkeys(contexts).keys())

        return [
            {
                "role": "system",
                "content": self.__rag_prompt.format(
                    context="".join([f"- {context}\n" for context in contexts])
                ),
            },
            *[{"role": chat["role"], "content": chat["content"]} for chat in messages],
        ]


if __name__ == "__main__":
    from pprint import pprint
    from app.models.core.RagDataset import RagDataset
    from app.models.core.ChunkFormat import ChunkFormat

    conversation: list[ChatMessage] = [
        {
            "role": "user",
            "content": "Salut, ça va ?",
            "context": ["Le contexte", "Le contexte"],
        },
        {
            "role": "assistant",
            "content": "Je vais super bien et toi ? Comment puis-je t'aider ?",
        },
        {"role": "user", "content": "Dis-moi", "context": ["Le contexte", "Un autre"]},
        {"role": "assistant", "content": "Oui?"},
    ]

    # data1 = Path(__file__).parent.parent.parent / "data" / "brut.txt"
    # rag = RAG([data1])

    data_folder = Path(__file__).parent.parent.parent / "data"

    rag = RAG(
        datasets=[
            RagDataset(
                path=data_folder / "42cursus.txt",
                chunkFormat=ChunkFormat(datatype="text", splitter="paragraphs"),
            ),
            RagDataset(
                path=data_folder / "projects.json",
                chunkFormat=ChunkFormat(datatype="json"),
            ),
            RagDataset(
                path=data_folder / "experiences.json",
                chunkFormat=ChunkFormat(datatype="json"),
            ),
            RagDataset(
                path=data_folder / "educations.json",
                chunkFormat=ChunkFormat(datatype="json"),
            ),
            RagDataset(
                path=data_folder / "skills.json",
                chunkFormat=ChunkFormat(datatype="json"),
            ),
        ]
    )

    conversationHandler = ConversationHandler()
    print("Enrichment Conversation")
    enrichment_conversation = ConversationHandler.get_context(
        rag, conversation, "SFT-R?"
    )
    pprint(enrichment_conversation)
    print(" ======== ")
    print("Send to LLM")
    # pprint(conversationHandler.build(enrichment_conversation))
    print(conversationHandler.build(enrichment_conversation), file=open("t.json", "w+"))
