import os
import sys
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

load_dotenv()
key = os.getenv('OPENAI_API_KEY')
args = sys.argv

llm = OpenAI(openai_api_key=key)
prompt = PromptTemplate(
    input_variables=["product"],
    template="What is a good name for a company that makes {product}?",
)

chain = LLMChain(llm=llm, prompt=prompt)
print(chain.run(args[1]))
