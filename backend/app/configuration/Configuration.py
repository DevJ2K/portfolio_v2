import os
import dotenv


class Configuration:
    def __init__(self):
        dotenv.load_dotenv()
        self.MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
        if not self.MISTRAL_API_KEY:
            raise ValueError("Please set the MISTRAL_API_KEY environment variable.")
        self.OLLAMA_MODEL = os.getenv("OLLAMA_MODEL")
        if not self.OLLAMA_MODEL:
            raise ValueError("Please set the OLLAMA_MODEL environment variable.")


CONFIGURATION = Configuration()

if __name__ == "__main__":
    print(CONFIGURATION.MISTRAL_API_KEY)
