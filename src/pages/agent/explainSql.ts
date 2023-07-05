// import { SQL_PREFIX, SQL_SUFFIX } from "@/lib/prompt";
// import { QuerySqlTool } from "langchain/dist/agents/tools";
// import { renderTemplate } from "langchain/dist/prompts/template.js";
// import { LLMChain } from "langchain";
// import { ZeroShotAgent, AgentExecutor } from "langchain/agents.js";
// import { SqlToolkit } from "langchain/agents.js";
// import { SqlDatabase } from "langchain/sql_db";
// import { Tool } from "langchain/dist/agents/tools";
// import { extend } from "langchain/agents"

// export interface SqlCreatePromptArgs extends ZeroShotCreatePromptArgs {
//   /** Number of results to return. */
//   topK?: number;
// }

// export declare class databaseExplainer extends Tool {
//   name: string;
//   description: string;
// } 

// export declare class ExplainSqlToolkit extends SqlToolkit {

//   constructor(db: SqlDatabase, tools: Tool[], dialect: string) {
//     super(db);
//     this.db = db;
//     this.dialect = dialect;
//     this.tools = [
//       ...this.tools,

//     ];
//   }
// }

// export function createSqlAgent(
//   llm: BaseLanguageModel,
//   toolkit: SqlToolkit,
//   args?: SqlCreatePromptArgs
// ) {
//   const {
//     prefix = SQL_PREFIX,
//     suffix = SQL_SUFFIX,
//     inputVariables = ["input", "agent_scratchpad"],
//     topK = 10,
//   } = args ?? {};
//   const { tools } = toolkit;
//   const formattedPrefix = renderTemplate(prefix, "f-string", {
//     dialect: toolkit.dialect,
//     top_k: topK,
//   });

//   const prompt = ZeroShotAgent.createPrompt(tools, {
//     prefix: formattedPrefix,
//     suffix,
//     inputVariables,
//   });
//   const chain = new LLMChain({ prompt, llm });
//   const agent = new ZeroShotAgent({
//     llmChain: chain,
//     allowedTools: tools.map((t) => t.name),
//   });
//   return AgentExecutor.fromAgentAndTools({
//     agent,
//     tools,
//     returnIntermediateSteps: true,
//   });
// }