// import { SQL_PREFIX, SQL_SUFFIX } from "./prompt.js";
// import { renderTemplate } from "langchain/dist/prompts/template.js";
// import { LLMChain } from "langchain";
// import { ZeroShotAgent, AgentExecutor } from "langchain/agents.js";
// import { SqlToolkit } from "langchain/agents.js";

// export interface SqlCreatePromptArgs extends ZeroShotCreatePromptArgs {
//   /** Number of results to return. */
//   topK?: number;
// }

// export class ExplainSqlToolkit extends SqlToolkit {
	
// 	tools: Tool[]; 
//   db: SqlDatabase;
//   dialect = "sqlite";

//   constructor(db: SqlDatabase, llm?: BaseLanguageModel) {
//     super();
//     this.db = db;
//     this.tools = [
//       new QuerySqlTool(db),
//       new InfoSqlTool(db),
//       new ListTablesSqlTool(db),
//       new QueryCheckerTool({ llm }),
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