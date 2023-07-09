import type { NextApiRequest, NextApiResponse } from "next";
import { queryCountryCode } from "@/lib/countries";
import { JSON_REQUEST } from "@/lib/prompt";
import { PromptTemplate, OpenAI, LLMChain } from "langchain";
import axios from "axios";

export type Channel = {
  id: string;
  label: string;
  freeRate?: string;
  timeDelay?: string;
};

export type Route = {
  id: any,
  label: string,
  children?: Channel[],
  freeRate?: string;
  timeDelay?: string;
  route?: string,
}

type Scheme = {
  id: string,
  label: string,
  routePortNum: Number,
  children: Route[]
}

type Label = {
  id: string,
  label: string
}

const request_url = 'http://172.24.131.225:9002/QuickPricingAppletService/analyzeAutoChannelForApplet'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  // construct json request
  const {query: prompt} = req.body;
  const llm = new OpenAI(
    { 
      openAIApiKey: process.env.OPENAI_API_KEY, 
      temperature: 0, 
      modelName: "gpt-3.5-turbo" 
    },
    {
      basePath: process.env.BASE_URL
    }
    );
  const promptTemplate = new PromptTemplate({
    template: JSON_REQUEST,
    inputVariables: ["Input"],
  });
  
  const jsonRequestChain = new LLMChain({ llm, prompt: promptTemplate });
  console.log(
    'Step0, json request', prompt
    );

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

  const graphData = regenerateSchemeList(response.data.schemeList);

  // Regenerate Scheme List, left one channel for each route
  function regenerateSchemeList(data: Scheme[]): Scheme[] {
    let tempList = data
    
    tempList.forEach((scheme: Scheme) => {
      scheme.children.forEach((route: Route) => {
        route.route = route.children && route.children[0].label.replace(/(|)/g, '')
        route.freeRate = route.children && route.children[0].freeRate
        route.timeDelay = route.children && route.children[0].timeDelay
      })
    })

    return tempList
  }

  function uniqueFunc(arr: any[], uniId: string){
    const res = new Map();
    return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
  }

  function routeFormat(route: string): string {

    const routeContent = route.trim().match(/\[(.+?)\]/g)
    const routeName = routeContent?.at(-3) || ''

    return routeName.replace(/[\[\]']+/g,'')
  }
  
  // Build Graph from one Solution
  function buildMermaidGraph(scheme: Scheme): string {
    let script = '';
    
    scheme.children.forEach((route: Route) => {
      const start = queryCountryCode(route.label.split('-')[0]).toString().replaceAll(',', '').toUpperCase()
      const end = queryCountryCode(route.label.split('-')[1]).toString().replaceAll(',', '').toUpperCase()
      script += `\t${start} -- ${routeFormat(route.route || '')}<br>Bandwidth:${route.freeRate}<br>Latency:${route.timeDelay} --> ${end}\n`
    })

    return script;
  }

  function buildMermaidNode(schemeList: Scheme[]): string {
    
    let labels: Label[] = [];
    let script = ''

    schemeList.forEach((scheme: Scheme) => {
      scheme.label.split('-').forEach(label => {
        labels.push({
          id: queryCountryCode(label).toString().replaceAll(',', '').toUpperCase(),
          label: label
        })
      })
    })

    uniqueFunc(labels, 'id').forEach((label: Label) => {
      script += `\t${label.id}(${label.label})\n`
    })

    return script
  }
  
  function constructGraph(graphData: Scheme[]): string {

    let script = ''

    script += 'graph TD\n';
    script += buildMermaidNode(graphData)

    graphData.forEach((schema: Scheme) =>{
      script += buildMermaidGraph(schema)
    })

    return script
  }

  res.status(200).json({
    result: constructGraph(graphData),
    prompt: prompt,
    sqlQuery: jsonRequest.text,
    from: 'mermaid'
  });

}

export default handler;







