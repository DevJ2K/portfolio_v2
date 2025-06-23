from dataclasses import dataclass
from pathlib import Path
from typing import Literal


@dataclass
class RagDataset:
    path: Path
    splitter: Literal["all", "lines", "paragraphs"]
