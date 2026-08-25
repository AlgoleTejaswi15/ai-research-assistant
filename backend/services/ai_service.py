import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=os.getenv("GROQ_API_KEY")
)

def summarize_text(text):

    prompt = f"""
Summarize the following research paper clearly.

Keep the summary around 150-200 words.

{text[:4000]}
"""

    response = llm.invoke(prompt)

    return response.content