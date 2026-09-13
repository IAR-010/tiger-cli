import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Tiger App"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./tiger.db")

    class Config:
        env_file = ".env"

settings = Settings()
