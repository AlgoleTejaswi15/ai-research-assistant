import os

from dotenv import load_dotenv
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq

load_dotenv()

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)


def create_vector_store(text):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n\n", "\n", ".", " ", ""]
    )

    docs = splitter.split_text(text)

    print("Chunks Created:", len(docs))

    Chroma.from_texts(
        texts=docs,
        embedding=embedding_model,
        persist_directory="vector_db"
    )

    print("Vector Store Created Successfully")


def ask_question(question):

    db = Chroma(
        persist_directory="vector_db",
        embedding_function=embedding_model
    )

    docs = db.similarity_search(
        question,
        k=10
    )

    if not docs:
        return "I couldn't find the answer in the uploaded research paper."

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
You are an AI Research Assistant.

Answer the user's question using ONLY the information provided in the context.

Rules:
- If the context contains relevant information, answer the question.
- Summarize and combine information from multiple paragraphs if needed.
- Do NOT say the answer is unavailable unless the context is completely unrelated.
- Do NOT invent facts outside the context.

Context:
{context}

Question:
{question}

Answer:
"""

    llm = ChatGroq(
        model="llama-3.1-8b-instant",
        api_key=os.getenv("GROQ_API_KEY")
    )

    response = llm.invoke(prompt)

    source = docs[0].page_content[:300]

    return f"""{response.content}

-----------------------------------------

📄 Source from uploaded PDF:

{source}
"""