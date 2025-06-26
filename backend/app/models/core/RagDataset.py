from dataclasses import dataclass
from pathlib import Path
from app.models.core.ChunkFormat import ChunkFormat


@dataclass
class RagDataset:
    path: Path
    chunkFormat: ChunkFormat
