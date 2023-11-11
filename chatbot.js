const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


async function main() {
    let s = await openaiAPI("Echo", "chatSingular", "Respond to the user's message with the same message.", 64, 1);
    console.log(s);
}

main();


//calls the openai api. Expects a String Prompt, a String type, Instruction is optional. maxTokens is optional and defaults to Infinity.
//temperature is optional and defaults to 1. It can be from 0 to 2. 0 is very conservative and 2 is very creative.
async function openaiAPI(inputPrompt, type, instruction, maxTokens, temperature) {
    if (maxTokens == null) {maxTokens = Infinity}
    if (temperature == null || temperature < 0 || temperature > 2) {temperature = 1}
    let systemMessage = null;
    let userMessage = null;
    let messages = null;
    switch (type) {
      case "chatSingular": //chatSingular is for when the user is only sending one message. History is not supported. 
        systemMessage = constructMessageObj("system", instruction);
        userMessage = constructMessageObj("user", inputPrompt);
        messages = [systemMessage, userMessage];
        console.log("Sending: " + messages[1].content + " to OpenAI.")
        try {
          let completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: maxTokens,
            temperature: temperature
          });
          return completion.choices[0].message.content;
        } catch (err) {
          //get status code to include in error message
          let statusCode = err.error.code;
          return "Something went wrong. Please try again. Error code: " + statusCode;
        }
      case "gpt4Singular": //GPT4 is for the more advanced model that costs about 10x as much. History is not supported.
        if (maxTokens == Infinity) {maxTokens = 64}
          systemMessage = constructMessageObj("system", instruction);
          userMessage = constructMessageObj("user", inputPrompt);
          messages = [systemMessage, userMessage];
          console.log("Sending: " + messages[1].content + " to OpenAI.")
          try {
            let completion = await openai.chat.completions.create({
              model: "gpt-4",
              messages: messages,
              max_tokens: maxTokens,
              temperature: temperature
            });
            return completion.choices[0].message.content;
          } catch (err) {
            //get status code to include in error message
            let statusCode = err.response.status;
            return "Something went wrong. Please try again. Error code: " + statusCode;
          }
      case "image":
      default:
        return "Unimplemented type";
      }
}

function constructMessageObj(role, content){
    return {"role": role, "content": content}
  }