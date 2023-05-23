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

# prompt = PromptTemplate(
#     input_variables=["adjective", "content"],
#     template="{adjective}{content}といえば？"
# )

# print(prompt.format(adjective="大きい", content="犬"))
chain = LLMChain(llm=llm, prompt=prompt)
print(chain.run(adjective="大きい", content="犬"))
