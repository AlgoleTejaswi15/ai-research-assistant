from fastapi import APIRouter, UploadFile, File, Body
import shutil
import os

from backend.services.pdf_service import extract_text_from_pdf
from backend.services.ai_service import summarize_text
from backend.services.rag_service import create_vector_store, ask_question

router = APIRouter()

UPLOAD_FOLDER = "backend/uploads"


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    # Save PDF
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    text = extract_text_from_pdf(file_path)

    # Create Vector Store
    create_vector_store(text)

    try:
        summary = summarize_text(text)

        print("SUMMARY GENERATED:")
        print(summary)

        return {
            "message": "PDF uploaded successfully",
            "summary": summary
        }

    except Exception as e:
        print("ERROR:")
        print(str(e))

        return {
            "message": "Error",
            "summary": str(e)
        }


@router.post("/ask-question")
async def ask(data: dict = Body(...)):

    answer = ask_question(data["question"])

    return {
        "answer": answer
    }