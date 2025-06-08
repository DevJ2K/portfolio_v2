from typing import TypedDict, Literal


class MistralInput(TypedDict):
    role: Literal["assistant", "user", "system"]
    content: str
