from app.utils.logger import rag_logger
from app.utils.Colors import BHMAG, RESET
from app.exceptions.RAGError import RAGError
from app.models.core.RagDataset import RagDataset
from app.services.AI.ChunkSplitter import ChunkSplitter
from app.configuration.Configuration import CONFIGURATION
from pathlib import Path
from rich.progress import track
import numpy as np
import ollama


class RAG:
    def __init__(self, datasets: list[RagDataset]) -> None:
        self.EMBEDDING_MODEL: str = str(CONFIGURATION.OLLAMA_MODEL)  # (..., 768)

        self.chunks: list[str] = []
        self.chunk_splitter: ChunkSplitter = ChunkSplitter()
        self.chunk_embeddings: np.ndarray = np.empty((0))

        # 1. Convert datasets to chunks
        self.chunks += self.__get_chunks__(datasets=datasets)
        rag_logger.info(f"Number of chunks: {len(self.chunks)}")
        if len(self.chunks) == 0:
            raise RAGError("Unable to setup RAG without chunks.")

        # 2. Load chunks into the vector database
        chunks_embeddings: np.ndarray = self.__load_chunks__(chunks=self.chunks)  # (n, d)
        self.chunk_embeddings = self.chunk_embeddings.reshape((0, chunks_embeddings.shape[1]))  # (0, d)
        self.chunk_embeddings = np.vstack([self.chunk_embeddings, chunks_embeddings])

    def __get_chunks__(self, datasets: list[RagDataset]) -> list[str]:
        chunks = []
        for dataset in datasets:
            try:
                with open(dataset.path, 'r') as f:
                    content = f.read()
                    chunks += self.chunk_splitter.split(data=content, format=dataset.chunkFormat)
            except Exception as e:
                rag_logger.error(f"Failed to retrieve chunks from '{dataset}' : {type(e).__name__} - {str(e)}")
        # for i, chunk in enumerate(chunks):
        #     print(f"{BHMAG}Chunk {i + 1}/{len(chunks)}:{RESET} {chunk[:75]}...")
        return chunks

    def __load_chunks__(self, chunks: list[str]) -> np.ndarray:
        chunk_embeddings: list[np.ndarray] = []

        for chunk in track(chunks, description=f"{BHMAG}Load chunks{RESET}"):
            sentence_embedding: list[float] = ollama.embed(model=self.EMBEDDING_MODEL, input=chunk)['embeddings'][0]
            chunk_embeddings.append(sentence_embedding)

        return np.vstack(chunk_embeddings)

    def __similarity__(self, matrix: np.ndarray, vector: np.ndarray) -> np.ndarray:
        return (matrix @ vector) / (np.linalg.norm(matrix, axis=1) * np.linalg.norm(vector))

    def retrieve(self, query: str, k: int) -> list[str]:
        query_embedding: np.ndarray = np.array(ollama.embed(model=self.EMBEDDING_MODEL, input=query)['embeddings'][0])

        similarities: np.ndarray = self.__similarity__(self.chunk_embeddings, query_embedding)
        indexes: np.ndarray = np.argsort(similarities)[::-1][:k]

        rag_logger.debug(f"Top similarities with : '{query}'\n{'\n'.join([f'{similarities[index]:.4f} - {self.chunks[index]}' for index in indexes])}")

        return [self.chunks[index] for index in indexes]


if __name__ == "__main__":
    from app.models.core.ChunkFormat import ChunkFormat

    data_folder = Path(__file__).parent.parent.parent / "data"

    rag = RAG(datasets=[
        RagDataset(path=data_folder / "42cursus.txt", chunkFormat=ChunkFormat(datatype="text", splitter="paragraphs")),
        RagDataset(path=data_folder / "projects.json", chunkFormat=ChunkFormat(datatype="json")),
        RagDataset(path=data_folder / "experiences.json", chunkFormat=ChunkFormat(datatype="json")),
        RagDataset(path=data_folder / "educations.json", chunkFormat=ChunkFormat(datatype="json")),
        RagDataset(path=data_folder / "skills.json", chunkFormat=ChunkFormat(datatype="json")),
    ])

    # import time
    # start_time = time.time()
    # rag.retrieve("Qu'elle est la meilleure couleur de SFT-R ?", k=1)
    # end_time = time.time()
    # print(f"Time taken: {end_time - start_time}")

    # start_time = time.time()
    # for i in range(50):
    #     rag.retrieve("Qu'elle est la meilleure couleur de SFT-R ?", k=1)
    # end_time = time.time()
    # print(f"Time taken: {end_time - start_time}")
    # exit(1)
    print("--------------------------------------------------")
    rag.retrieve("En combien de temps Theo a-t-il terminé le cursus de 42 ?", k=5)
    print("--------------------------------------------------")
    # print("--------------------------------------------------")
    # rag.retrieve("What are DevJ2K's main programming skills?", k=3)
    # print("--------------------------------------------------")
    # rag.retrieve("What technologies is DevJ2K passionate about?", k=3)
    # print("--------------------------------------------------")
    # rag.retrieve("How fast did DevJ2K complete the 42 core curriculum?", k=3)
    # print("--------------------------------------------------")
    # rag.retrieve("How did Théo get into coding?", k=3)
    # print("--------------------------------------------------")
