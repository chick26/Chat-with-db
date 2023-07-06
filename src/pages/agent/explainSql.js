import { ZeroShotAgent, AgentExecutor } from "langchain/agents";
import { SQL_PREFIX, SQL_SUFFIX, SQL_EXPLAINER } from "@/lib/prompt";
import { renderTemplate } from "langchain/prompts";
import { LLMChain } from "langchain";
import { DynamicTool } from "langchain/tools";

// @ts-ignore
export function createSqlExplainerAgent(llm, toolkit, args) {
  
  const { prefix = SQL_PREFIX, suffix = SQL_SUFFIX, inputVariables = ["input", "agent_scratchpad"], topK = 10, } = args ?? {};
  const { tools } = toolkit;

  const toolsWithExplainer = [
    ...tools,
    new DynamicTool({
      name: "sql-description",
      description:
        'Input to this tool are names of all tables that should be queried, output is the description of each col.\n' +
        'If the coloumn of each table is hard to understand, it should be used to help understanding the table',
      func: async (input) => {
        // @ts-ignore
        const { configurable, value } = Object.getOwnPropertyDescriptor(SQL_EXPLAINER, input)
        if (!configurable) {
          return "No such table detail"
        } else {
          return value;
        }
      },
    }),
  ];
  
  const formattedPrefix = renderTemplate(prefix, "f-string", {
      dialect: toolkit.dialect,
      top_k: topK,
  });

  const prompt = ZeroShotAgent.createPrompt(toolsWithExplainer, {
      prefix: formattedPrefix,
      suffix,
      inputVariables,
  });
  const chain = new LLMChain({ prompt, llm });
  const agent = new ZeroShotAgent({
      llmChain: chain,
      allowedTools: toolsWithExplainer.map((t) => t.name),
  });
  return AgentExecutor.fromAgentAndTools({
      agent,
      tools: toolsWithExplainer,
      returnIntermediateSteps: true,
  });
}