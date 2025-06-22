from abc import ABC, abstractmethod


class NotificationProvider(ABC):
    @abstractmethod
    def send(self, email: str, title: str, message: str) -> bool:
        pass
