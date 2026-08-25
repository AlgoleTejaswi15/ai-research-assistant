from backend.services.rag_service import ask_question

question = "What is the objective of this project?"

answer = ask_question(question)

print(answer)