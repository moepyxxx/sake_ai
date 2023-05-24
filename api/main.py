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
from langchain.chains.base import Chain
from typing import Dict, List

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

class ConcatenateChain(Chain):
    recommend_chain: LLMChain
    analytics_chain: LLMChain

    @property
    def input_keys(self) -> List[str]:
        all_input_vars = set(self.recommend_chain.input_keys).union(set(self.analytics_chain.input_keys))
        return list(all_input_vars)

    @property
    def output_keys(self) -> List[str]:
        return ['result']

    def _call(self, inputs: Dict[str, str]) -> Dict[str, str]:
        recommend = self.recommend_chain.run(inputs)
        analytics = self.analytics_chain.run(inputs)
        return {'result': {'recommend': recommend, 'analytics': analytics}}

@app.post("/")
async def answer(review: SakeReview):
    recommend_chain = LLMChain(llm=llm, prompt=recommend_prompt, output_key="recommend")
    analytics_chain = LLMChain(llm=llm, prompt=analytics_prompt, output_key="analytics")

    concat_chain = ConcatenateChain(recommend_chain=recommend_chain, analytics_chain=analytics_chain, verbose=True)
    result = concat_chain.run({"hoshi_go":review.hoshi_go, "hoshi_yon":review.hoshi_yon, "hoshi_san":review.hoshi_san, "hoshi_ni":review.hoshi_ni, "hoshi_ichi":review.hoshi_ichi})
    return result
