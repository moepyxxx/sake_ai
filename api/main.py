from fastapi import FastAPI
import os
import sys
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.prompts import load_prompt
from langchain.chains import LLMChain
from pydantic import BaseModel

load_dotenv()
key = os.getenv('OPENAI_API_KEY')
app = FastAPI()

llm = OpenAI(model_name="text-davinci-003",openai_api_key=key, max_tokens=-1)
prompt = load_prompt("prompt.json")

class SakeReview(BaseModel):
    hoshi_go: str
    hoshi_yon: str
    hoshi_san: str
    hoshi_ni: str
    hoshi_ichi: str

@app.post("/")
async def answer(review: SakeReview):
    chain = LLMChain(llm=llm, prompt=prompt)
    result = chain.run(hoshi_go=review.hoshi_go, hoshi_yon=review.hoshi_yon, hoshi_san=review.hoshi_san, hoshi_ni=review.hoshi_ni, hoshi_ichi=review.hoshi_ichi)
    return {"result": result}
