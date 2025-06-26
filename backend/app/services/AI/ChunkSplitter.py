import json
from app.models.core.ChunkFormat import ChunkFormat

class ChunkSplitter:
    def __init__(self):
        pass

    def split(self, data: str, format: ChunkFormat) -> list[str]:
        """
        Splits the input data based on the specified format.

        :param data: The input data to be split.
        :param format: The format specifying how to split the data.
        :return: A list of chunks.
        """
        if format.datatype == "text":
            if format.splitter == "all":
                return [data]
            elif format.splitter == "lines":
                return [line for line in data.splitlines() if line.strip()]
            elif format.splitter == "paragraphs":
                return [paragraph for paragraph in data.split("\n\n") if paragraph.strip()]
            else:
                raise ValueError(f"Unknown splitter type: {format.splitter}")
        elif format.datatype == "json":
            try:
                json_data = json.loads(data)
                if not isinstance(json_data, dict):
                    raise ValueError("JSON data must be an object at the top level.")
                chunks = []
                for item in json_data.get("content", []):
                    string_content = f"{json_data.get('suffix', '')}\n"
                    string_content += "\n".join(f"{key}: {value}" for key, value in item.items())
                    chunks.append(string_content)
                return chunks
            except json.JSONDecodeError as e:
                raise ValueError(f"Invalid JSON data: {e}")
        else:
            raise ValueError(f"Unknown datatype: {format.datatype}")

if __name__ == "__main__":
    from pathlib import Path
    # Example usage
    splitter = ChunkSplitter()

    with open(Path(__file__).parent.parent.parent / "data" / "projects.json", 'r', encoding='utf-8') as file:
        json_project = file.read()

    # print(splitter.split(json_project, ChunkFormat(datatype="json")))
    for chunk in splitter.split(json_project, ChunkFormat(datatype="json")):
        print(chunk)
        print("-" * 20)

    with open(Path(__file__).parent.parent.parent / "data" / "test.txt", 'r', encoding='utf-8') as file:
        test_project = file.read()

    for chunk in splitter.split(test_project, ChunkFormat(datatype="text", splitter="paragraphs")):
        print(chunk)
        print("-" * 20)
