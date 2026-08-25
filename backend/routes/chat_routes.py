from fastapi import APIRouter

router = APIRouter()

@router.get("/chat")
def chat(question: str):

    return {
        "answer": f"You asked: {question}"
    }