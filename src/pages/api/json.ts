import { JSON_INTERPRETER, JSON_REQUEST, JSON_API_TEMPLATE } from "@/lib/prompt";
import { LLMChain, PromptTemplate, OpenAI } from "langchain";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const request_url = 'http://172.24.131.225:9002/QuickPricingAppletService/analyzeAutoChannelForApplet'


export const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  // construct json request
  const {query: prompt} = req.body;
  const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0, modelName: "gpt-3.5-turbo" });
  const promptTemplate = new PromptTemplate({
    template: JSON_REQUEST,
    inputVariables: ["Input"],
  });
  
  const jsonRequestChain = new LLMChain({ llm, prompt: promptTemplate });
  console.log('Step0, json request', prompt);
  
  try {
    const jsonRequest = await jsonRequestChain.call({ Input: prompt })
    console.log(
      'Step1, Response with json request:', jsonRequest.text
    )
    // request for api
    const response = await axios.post(
      request_url, 
      jsonRequest.text, 
      {
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "zh-CN,zh;q=0.9",
          "Connection": "keep-alive",
          "Content-Type": "application/json",
        }
      }
    );
    console.log('Step2, Reponse for api', JSON.stringify(response.data));
    // explain json response
    
    const explainPromptTemplate = new PromptTemplate({
      template: JSON_INTERPRETER,
      inputVariables: ["Json_Input", "Template_Input"],
    });
    const explainResponseChain = new LLMChain({ llm, prompt: explainPromptTemplate });
    const explainResponse = await explainResponseChain.call({
      Json_Input: JSON.stringify(response.data), 
      Template_Input: JSON.stringify(JSON_API_TEMPLATE)
    })
    console.log('Step3, explain reponse', explainResponse.text)

    res.status(200).json({
      result: explainResponse.text,
      prompt: prompt,
      sqlQuery: jsonRequest.text,
      from: 'json'
    });
    
  } catch (e) {
    res.status(500)
    return Error('wrong request for api')
  }
};

export default handler;

