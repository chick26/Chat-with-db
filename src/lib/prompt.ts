export const SQL_PREFIX = `You are an agent designed to interact with a SQL database.
Given an input question, create a syntactically correct {dialect} query to run, then look at the results of the query and return the answer.
Always limit your query to at most {top_k} results using the LIMIT clause.
You can order the results by a relevant column to return the most interesting examples in the database.
Never query for all the columns from a specific table, only ask for a the few relevant columns given the question.
If you get a "no such table" error, rewrite your query by using the table in quotes.
DO NOT use a column name that does not exist in the table.
You have access to tools for interacting with the database.
Only use the below tools. Only use the information returned by the below tools to construct your final answer.
You MUST double check your query before executing it. If you get an error while executing a query, rewrite a different query and try again.
DO NOT try to execute the query more than three times.
DO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database.
If the question does not seem related to the database, just return "I don't know" as the answer.
If you cannot find a way to answer the question, just return the best answer you can find after trying at least three times.`;

export const SQL_SUFFIX = `Begin!
Question: {input}
Thought: I should look at the tables in the database to see what I can query.
{agent_scratchpad}`;

export const SQL_EXPLAINER = {
  'ct_pop_fault': `海缆系统名称是POP_SYS,海缆类型是POP_TYPE,其中1:参建海缆、2:外租海缆,故障段落是POP_FAULT_SEG,故障段落详情是POP_FAULT_SEG_DETAIL,故障原因是POP_FAULT_REASON,影响段落方向是,故障时间是POP_FAULT_TIME,录入时间是CREATE_TIME,更新时间是UPDATE_TIME,船只联系是POP_REPAIR_BOAT,船只动态是POP_REPAIR_DYN_INFO,修复计划是POP_REPAIR_PLANE,修理状态是REPAIR_STATUS,其中修复状态:1:未开始、2:已出发、3:修复中,4-已结束修理结束时间是REPAIR_DONE_TIME,业务中断时间是BUSINESS_BREAK_TIME,业务恢复时间是BUSINESS_RECOVERY_TIME`
}

export const JSON_REQUEST = `{Input},这句话是在询问从起始城市到终点城市的传输资源方案,其中包含速率的要求,请从这句话当中解析出来两端的城市名称以及速率,并形成JSON格式的数据,例如：{{"ANode": "伦敦","ZNode": "北京","rate": "200M","type": "1"}}, 只输出 JSON 格式内容即可, 无需任何额外信息`

export const JSON_INTERPRETER = `Following JSON is a network routing scheme list with different routes between various locations. For example, The JSON data like {Template_Input} Each element is one solution, its solution shows like:-"伦敦-马赛-吉布提":1."伦敦-马赛",ciruit detail(which selected by sub ciruit list)2."马赛-吉布提",ciruit detail(which selected by sub ciruit list). This Solution contains {start} to the {end} with its sub ciruit. The structure of sub circuit is [circuit number][free bandwidth][latency]. Please breakdown of the routes and list out the first 2 solutions: {Json_Input}`

export const MERMAID_INTERPRETER = `Follwing data is several routes from {start} to {end}, please convert data into Mermaid script using all the detail including ciruit between each point. Here is an example: The {solution_template} contains several  different routes. They all start from the same {start} to {end}, passing through the same point or some passing an external ponit. As the example input gived above, different routes should be combined as one graph like {mermaid_template}. Now, you should only output the mermaid script without any explaination using the data: {input}`

export const JSON_API_TEMPLATE = {
  "schemeList": [
    { "children": 
      [
        {
          "children": "sub-ciruit-list", 
          "label": "伦敦-马赛" 
        }, 
        { 
          "label": "马赛-吉布提", 
          "children": "sub-ciruit-list"
        }
      ], 
      "label": "伦敦-马赛-吉布提" 
    }
  ]
}

export const MERMAID_TEMPLATE = `
graph TD
  START(A)
  INNER(B)
  END(C)
  START -->|ciruit1<br>Bandwidth:bandwidth1<br>Latency:latency1|--> INNER
  INNER -->|ciruit2<br>Bandwidth:bandwidth2<br>Latency:latency2|--> END
  START -->|ciruit3<br>Bandwidth:bandwidth3<br>Latency:latency3|--> END
`

export const SOLUTION_TEMPLATE = `
Solution 1: A-B-C
1. A-B:[ciruit1] [bandwidth1] [latency1]
2. B-C:[ciruit2] [bandwidth2] [latency2]
Solution 2: A-C
1. A-C:[ciruit3] [bandwidth3] [latency3]
`