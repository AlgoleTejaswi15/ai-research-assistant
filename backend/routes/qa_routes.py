from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.rag_service import ask_question

router = APIRouter()

class QuestionRequest(BaseModel):
    question: str

@router.post("/ask")
async def ask(data: QuestionRequest):

    answer = ask_question(data.question)

    return {
        "answer": answer
    }