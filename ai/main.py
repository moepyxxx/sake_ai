import os
import sys
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.prompts import load_prompt
from langchain.chains import LLMChain
from langchain.chains import SimpleSequentialChain

load_dotenv()
key = os.getenv('OPENAI_API_KEY')
args = sys.argv

llm = OpenAI(openai_api_key=key)
recommend_prompt = load_prompt("recommend_prompt.json")
analytics_prompt = load_prompt("analytics_prompt.json")

recommend_chain = LLMChain(llm=llm, prompt=recommend_prompt)
analytics_chain = LLMChain(llm=llm, prompt=analytics_prompt)
overall_chain = SimpleSequentialChain(
    chains=[recommend_chain, analytics_chain], 
    verbose=True
)

result = overall_chain.run(hoshi_go="雪の茅舎,伯楽星,冩楽", hoshi_yon="ささのつゆ", hoshi_san="久保田,田酒", hoshi_ni="作,ロ万", hoshi_ichi="上善如水")
print(result)