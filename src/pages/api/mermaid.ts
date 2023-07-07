// import { MERMAID_INTERPRETER } from "@/lib/prompt";
// import { LLMChain, PromptTemplate, OpenAI } from "langchain";
// import type { NextApiRequest, NextApiResponse } from "next";

// export const handler = async (req: NextApiRequest, res: NextApiResponse) => {

//   // construct json request
//   const {query: prompt} = req.body;
//   const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0, modelName: "gpt-3.5-turbo" });
//   const promptTemplate = new PromptTemplate({
//     template: MERMAID_INTERPRETER,
//     inputVariables: ["start", "end", "input"],
//   });
  
//   const jsonRequestChain = new LLMChain({ llm, prompt: promptTemplate });
//   console.log('Step0, json request', prompt);
  
//   try {

    
//     const explainPromptTemplate = new PromptTemplate({
//       template: JSON_INTERPRETER,
//       inputVariables: ["Json_Input", "Template_Input"],
//     });
//     const explainResponseChain = new LLMChain({ llm, prompt: explainPromptTemplate });
//     const explainResponse = await explainResponseChain.call({
//       Json_Input: JSON.stringify(response.data), 
//       Template_Input: JSON.stringify(JSON_API_TEMPLATE)
//     })
//     console.log('Step3, explain reponse', explainResponse.text)

//     res.status(200).json({
//       result: explainResponse.text,
//       prompt: prompt,
//       sqlQuery: jsonRequest.text,
//       from: 'json'
//     });
    
//   } catch (e) {
//     res.status(500)
//     return Error('wrong request for api')
//   }
// };

// export default handler;

