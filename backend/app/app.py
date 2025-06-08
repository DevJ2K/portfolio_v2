from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import chat
from app.utils.logger import main_logger


main_app = FastAPI(title="MyApp", version="0.0.1")

main_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@main_app.exception_handler(Exception)
async def generic_error_handler(request, exc: Exception):
    main_logger.error(f"Unexpected error: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"message": "An unexpected error occurred."}
    )


@main_app.get("/healthcheck")
async def healthcheck():
    """
    Healthcheck endpoint to check if the server is running.
    """
    main_logger.info("Healthcheck endpoint called")
    return JSONResponse(
        status_code=200,
        content={"status": "ok"}
    )

# CHAT
main_app.include_router(
    chat.router,
    prefix="/chat",
    tags=["Chat"])
