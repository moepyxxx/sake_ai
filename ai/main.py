import os
import sys
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.prompts import load_prompt
from langchain.chains import LLMChain

load_dotenv()
key = os.getenv('OPENAI_API_KEY')
args = sys.argv

llm = OpenAI(openai_api_key=key)
prompt = load_prompt("prompt.json")

chain = LLMChain(llm=llm, prompt=prompt)
result = chain.run(hoshi_go="雪の茅舎,伯楽星,冩楽", hoshi_yon="ささのつゆ", hoshi_san="久保田,田酒", hoshi_ni="作,ロ万", hoshi_ichi="上善如水")
print(result)