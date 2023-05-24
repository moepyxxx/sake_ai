from fastapi import FastAPI
import os
import sys
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.prompts import load_prompt
from langchain.chains import LLMChain
from pydantic import BaseModel
from langchain.chains import SequentialChain

load_dotenv()
key = os.getenv('OPENAI_API_KEY')
app = FastAPI()

llm = OpenAI(model_name="text-davinci-003",openai_api_key=key, max_tokens=-1)
recommend_prompt = load_prompt("recommend_prompt.json")
analytics_prompt = load_prompt("analytics_prompt.json")

class SakeReview(BaseModel):
    hoshi_go: str
    hoshi_yon: str
    hoshi_san: str
    hoshi_ni: str
    hoshi_ichi: str

@app.post("/")
async def answer(review: SakeReview):
    recommend_chain = LLMChain(llm=llm, prompt=recommend_prompt, output_key="recommend")
    analytics_chain = LLMChain(llm=llm, prompt=analytics_prompt, output_key="analytics")

    overall_chain = SequentialChain(
        chains=[recommend_chain, analytics_chain],
        input_variables=["hoshi_go", "hoshi_yon", "hoshi_san", "hoshi_ni", "hoshi_ichi"],
        verbose=True
    )
    result = overall_chain.run({"hoshi_go":review.hoshi_go, "hoshi_yon":review.hoshi_yon, "hoshi_san":review.hoshi_san, "hoshi_ni":review.hoshi_ni, "hoshi_ichi":review.hoshi_ichi})
    return {"result": result}
