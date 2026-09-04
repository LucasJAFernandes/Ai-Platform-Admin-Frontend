export type LogStatus = 'success' | 'error' | 'warning' | 'pending';

export interface AILog {
  id: number;
  tenant_name: string;
  user_email: string;
  agent_name: string;
  query: string;
  response_preview: string;
  model_used: string;
  tokens_input: number;
  tokens_output: number;
  tokens_total: number;
  response_time_ms: number;
  status: LogStatus;
  error_message: string | null;
  rag_chunks_used: number;
  rag_relevance_score: number | null;
  created_at: string;
}

export interface TopAgent {
  agent_name: string;
  total_queries: number;
  success_rate: number;
  avg_response_time_ms: number;
}

export interface AIStats {
  total_queries: number;
  total_tokens: number;
  avg_response_time_ms: number;
  success_rate: number;
  top_agents: TopAgent[];
}

export interface AILogsResponse {
  logs: AILog[];
  total: number;
  page: number;
  page_size: number;
  stats: AIStats;
}
