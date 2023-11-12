from flask import Flask, request, jsonify
import openai
from dotenv import load_dotenv
import os
import base64

load_dotenv()

app = Flask(__name__)

client = openai.OpenAI(
  api_key=os.getenv("OPENAI_API_KEY"),
)
client.models.list()

#calls the openai api. Expects a String Prompt, a String type, Instruction is optional. maxTokens is optional and defaults to Infinity.
#temperature is optional and defaults to 1. It can be from 0 to 2. 0 is very conservative and 2 is very creative.
def openaiAPI(inputPrompt, type, instruction, maxTokens, temperature):
    if maxTokens is None:
        maxTokens = float('inf')
    if temperature is None or temperature < 0 or temperature > 2:
        temperature = 1
    systemMessage = None
    userMessage = None
    messages = None
    if type == "chatSingular":
        systemMessage = constructMessageObj("system", instruction)
        userMessage = constructMessageObj("user", inputPrompt)
        messages = [systemMessage, userMessage]
        print("Sending: " + messages[1]['content'] + " to OpenAI.")
        try:
            completion = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=maxTokens,
                temperature=temperature
            )
            return completion.choices[0].message.content
        except Exception as err:
            statusCode = err.error.code
            return "Something went wrong. Please try again. Error code: " + statusCode
    elif type == "gpt4Singular":
        if maxTokens == float('inf'):
            maxTokens = 64
        systemMessage = constructMessageObj("system", instruction)
        userMessage = constructMessageObj("user", inputPrompt)
        messages = [systemMessage, userMessage]
        print("Sending: " + messages[1].content + " to OpenAI.")
        try:
            completion = openai.chat.completions.create(
                model="gpt-4",
                messages=messages,
                max_tokens=maxTokens,
                temperature=temperature
            )
            return completion.choices[0].message.content
        except Exception as err:
            statusCode = err.response.status
            return "Something went wrong. Please try again. Error code: " + statusCode
    else:
        return "Unimplemented type"

def constructMessageObj(role, content):
    return {"role": role, "content": content}

@app.route('/endpoint1', methods=['POST'])
def endpoint1():
    data = request.get_json()
    # do something with the data
    return jsonify({'message': 'Endpoint 1 received the following data: {}'.format(data)})

@app.route('/endpoint2', methods=['POST'])
def endpoint2():
    data = request.get_json()
    # do something else with the data
    return jsonify({'message': 'Endpoint 2 received the following data: {}'.format(data)})


@app.route('/upload-image', methods=['POST'])
def upload_image():
    data = request.get_json()
    image_data = data['image']
    image_data = image_data.split(',')[1]
    image_binary = base64.b64decode(image_data)
    # do something with the image binary data
    return jsonify({'message': 'Image received and processed successfully'})


if __name__ == '__main__':
    # test openai api
    # send request to api
    print("Hi")
    #app.run(debug=True)
