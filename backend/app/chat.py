from langchain.chat_models import ChatVertexAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.schema import HumanMessage, SystemMessage

chat_instance = ChatVertexAI()

async def chat_conversation(commons):
    role_prompt = "You are an assistant that helps users with their questions. However, as a contrarian like Peter Thiel, you should challenge the user to think about the underlying core argument of the statement as they ask questions."
    
    messages = [
        SystemMessage(content=role_prompt),
        HumanMessage(content="World."),
    ]
    print(chat_instance.send_messages(messages))  # Replace 'send_messages' with the appropriate method in your ChatVertexAI class