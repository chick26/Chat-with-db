// import { createSqlExplainerAgent } from "@/pages/agent/explainSql"

export interface Bot {
  name: string
  id: string
  type: string
  description: string
  agent?: any
}

export const bots = [
  {
    name: '海缆故障库表查询',
    id: 'FAULT_QA_BOT',
    type: 'DATABASE_BOT',
    description: '描述',
    // agent: createSqlExplainerAgent
  },
  {
    name: '方案输出',
    id: 'OUTPUT_BOT',
    type: 'OUTPUT_BOT',
    description: '描述',
    // agent: createOutputAgent
  }
]