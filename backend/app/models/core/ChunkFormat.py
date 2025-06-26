from dataclasses import dataclass
from pathlib import Path
from typing import Literal


@dataclass
class ChunkFormat:
    datatype: Literal["text", "json"]
    splitter: Literal["all", "lines", "paragraphs"] | None = None
