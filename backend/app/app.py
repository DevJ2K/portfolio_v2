from fastapi import FastAPI, status, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import chat
from app.routes.contact import contact
from app.configuration.Configuration import CONFIGURATION
from app.utils.logger import main_logger


main_app = FastAPI(title="DevJ2K - Portfolio - API", version="1.0.0", description="API for my portfolio website.")

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
    if isinstance(exc, HTTPException):
        return JSONResponse(
            status_code=exc.status_code, content={"message": exc.detail}
        )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"message": "An unexpected error occurred."},
    )


@main_app.middleware("http")
async def check_internal_api(request: Request, call_next):
    # main_logger.info(f"Internal API request: {request.method} {request.url.path}")
    if (
        CONFIGURATION.PROXY_STATUS == "enabled" and request.headers.get("x-api-key") != CONFIGURATION.API_KEY
    ):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
    return await call_next(request)


@main_app.get("/healthcheck")
async def healthcheck():
    """
    Healthcheck endpoint to check if the server is running.
    """
    main_logger.info("Healthcheck endpoint called")
    return JSONResponse(status_code=200, content={"status": "ok"})


# CHAT
main_app.include_router(chat.router, prefix="/chat", tags=["Chat"])

# CONTACT
main_app.include_router(contact.router, prefix="/contact", tags=["Contact"])
