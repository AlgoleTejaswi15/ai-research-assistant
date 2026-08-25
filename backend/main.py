from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.auth_routes import router
from backend.routes.pdf_routes import router as pdf_router
from backend.routes.qa_routes import router as qa_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(pdf_router)
app.include_router(qa_router)