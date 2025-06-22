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
        self.EMAIL_RECEIVER = os.getenv("EMAIL_RECEIVER")
        if not self.EMAIL_RECEIVER:
            raise ValueError("Please set the EMAIL_RECEIVER environment variable.")
        self.EMAIL_SENDER = os.getenv("EMAIL_SENDER")
        if not self.EMAIL_SENDER:
            raise ValueError("Please set the EMAIL_SENDER environment variable.")
        self.PASSWORD_SENDER = os.getenv("PASSWORD_SENDER")
        if not self.PASSWORD_SENDER:
            raise ValueError("Please set the PASSWORD_SENDER environment variable.")
        self.API_KEY = os.getenv("API_KEY")
        if not self.API_KEY:
            raise ValueError("Please set the API_KEY environment variable.")
        self.PROXY_STATUS = os.getenv("PROXY_STATUS") # disabled || enabled
        if not self.PROXY_STATUS:
            raise ValueError("Please set the PROXY_STATUS environment variable.")


CONFIGURATION = Configuration()

if __name__ == "__main__":
    print(CONFIGURATION.MISTRAL_API_KEY)
