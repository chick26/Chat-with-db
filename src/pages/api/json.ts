import { JSON_INTERPRETER, JSON_REQUEST } from "@/lib/prompt";
import { LLMChain, PromptTemplate, OpenAI } from "langchain";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const request_url = 'http://172.24.131.225:9002/QuickPricingAppletService/analyzeAutoChannelForApplet'


export const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  // construct json request
  const {query: prompt} = req.body;
  const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0 });
  const promptTemplate = new PromptTemplate({
    template: JSON_REQUEST,
    inputVariables: ["Input"],
  });
  const jsonRequestChain = new LLMChain({ llm, prompt: promptTemplate });

  try {
    const jsonRequest = await jsonRequestChain.call({ Input: prompt })
    console.log(
      'Step1, Response with json request:', jsonRequest
    )
    // request for api
    const response = await axios.post(
      request_url, 
      jsonRequest, 
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
    console.log('Step2, Reponse for api', response.data);
      // explain json response
    const explainPromptTemplate = new PromptTemplate({
      template: JSON_INTERPRETER,
      inputVariables: ["Json_Input"],
    });
    const explainResponseChain = new LLMChain({ llm, prompt: explainPromptTemplate });
    const explainResponse = await explainResponseChain.call({Json_Input: JSON.stringify(response.data)})
    console.log('Step3, explain reponse', explainResponse)
    res.status(200).json(explainResponse);
    
  } catch (e) {
    res.status(500)
    return Error('wrong request for api')
  }
};

export default handler;

