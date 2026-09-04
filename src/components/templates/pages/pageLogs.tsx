'use client';

import { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Input } from '@/components/atoms/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/select';
import {
  Search,
  RefreshCw,
  CheckCircle,
  Clock,
  ChevronRight,
  ChevronDown,
  Copy,
  XCircle,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { StatsCards } from '@/components/organisms/statsCards';
import { statsData, mockLogs } from '@/mocks/ai-logs';
import { AILog } from '@/lib/types/ai-logs.types';
const statusConfig: Record<
  string,
  { color: string; bgColor: string; icon: React.ElementType; label: string }
> = {
  success: {
    color: 'text-green-700 dark:text-green-400',
    bgColor: 'bg-green-500/20',
    icon: CheckCircle,
    label: 'Success',
  },
  error: {
    color: 'text-red-700 dark:text-red-400',
    bgColor: 'bg-red-500/20',
    icon: XCircle,
    label: 'Error',
  },
  warning: {
    color: 'text-yellow-700 dark:text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    icon: AlertTriangle,
    label: 'Warning',
  },
  pending: {
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-500/20',
    icon: Clock,
    label: 'Pending',
  },
};

const modelColors: Record<string, string> = {
  'gpt-4': 'bg-purple-500',
  'gpt-3.5-turbo': 'bg-blue-500',
  'text-embedding-3-small': 'bg-green-500',
  'text-embedding-3-large': 'bg-green-600',
  claude: 'bg-orange-500',
};

export default function AILogs() {
  const [total] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [agentFilter, setAgentFilter] = useState('all');
  const [expandedLog, setExpandedLog] = useState<number | null>(null);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatLatency = (ms: number) => {
    return (ms / 1000).toFixed(1) + 's';
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex mb-3 items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              AI Logs
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Monitor AI API calls, usage, and performance
            </p>
          </div>
          <Button
            variant="outline"
            className="border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <RefreshCw className={`w-4 h-4 mr-2`} />
            Refresh
          </Button>
        </div>
        <StatsCards stats={statsData} />
        <div className="group bg-gray-100 dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 mt-4">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-zinc-900 dark:text-white">
                Recent API Calls {total > 0 && `(${total})`}
              </CardTitle>
              <div className="flex flex-wrap gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search logs..."
                    className="pl-10 bg-white dark:bg-zinc-900 border-gray-300 dark:border-white/10 text-zinc-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 bg-white dark:bg-zinc-900 border-gray-300 dark:border-white/10 text-zinc-900 dark:text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-gray-300 dark:border-white/10">
                    <SelectItem
                      value="all"
                      className="text-zinc-900 dark:text-white"
                    >
                      All Status
                    </SelectItem>
                    <SelectItem
                      value="success"
                      className="text-zinc-900 dark:text-white"
                    >
                      Success
                    </SelectItem>
                    <SelectItem
                      value="error"
                      className="text-zinc-900 dark:text-white"
                    >
                      Error
                    </SelectItem>
                    <SelectItem
                      value="warning"
                      className="text-zinc-900 dark:text-white"
                    >
                      Warning
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={agentFilter} onValueChange={setAgentFilter}>
                  <SelectTrigger className="w-40 bg-white dark:bg-zinc-900 border-gray-300 dark:border-white/10 text-zinc-900 dark:text-white">
                    <SelectValue placeholder="Agent" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-gray-300 dark:border-white/10">
                    <SelectItem
                      value="all"
                      className="text-zinc-900 dark:text-white"
                    >
                      All Agents
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockLogs.map((log: AILog) => {
                const statusInfo =
                  statusConfig[log.status] || statusConfig.pending;

                const StatusIcon = statusInfo.icon;
                const isExpanded = expandedLog === log.id;
                const modelColor = modelColors[log.model_used] || 'bg-gray-500';

                return (
                  <div
                    key={log.id}
                    className="border border-gray-200 dark:border-white/5 rounded-lg overflow-hidden"
                  >
                    <div
                      onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                      className="p-3 sm:p-4 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <button
                          className="text-gray-400 shrink-0 mt-0.5 sm:mt-0"
                          aria-label={
                            isExpanded ? 'Collapse log' : 'Expand log'
                          }
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              className={`dark:bg-zinc-900 bg-zinc-200 ${statusInfo.color} border-0`}
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusInfo.label}
                            </Badge>

                            <Badge
                              className={`${modelColor} text-white max-w-[140px] truncate`}
                            >
                              {log.model_used}
                            </Badge>
                            <span className="hidden lg:block text-gray-500 dark:text-gray-500 text-xs ml-auto">
                              {formatTimestamp(log.created_at)}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                            <span className="text-zinc-700 dark:text-gray-300 text-sm font-medium">
                              {log.agent_name}
                            </span>

                            <span className="text-gray-500 dark:text-gray-500 text-xs sm:text-sm">
                              {log.tenant_name}
                            </span>

                            <span className="text-gray-500 dark:text-gray-500 text-xs sm:text-sm break-all">
                              {log.user_email}
                            </span>
                          </div>
                          <span className="block lg:hidden text-gray-500 dark:text-gray-500 text-xs mt-2">
                            {formatTimestamp(log.created_at)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 truncate sm:pl-7">
                        {log.query}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 sm:pl-7 text-xs text-gray-500 dark:text-gray-500">
                        <span className="whitespace-nowrap">
                          Tokens: {log.tokens_input} in / {log.tokens_output}{' '}
                          out
                        </span>

                        <span className="whitespace-nowrap">
                          Latency: {formatLatency(log.response_time_ms)}
                        </span>

                        {log.rag_chunks_used > 0 && (
                          <span className="whitespace-nowrap">
                            RAG chunks: {log.rag_chunks_used}
                          </span>
                        )}

                        {log.rag_relevance_score && (
                          <span className="whitespace-nowrap">
                            Relevance:{' '}
                            {(log.rag_relevance_score * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="p-3 sm:p-4 bg-gray-100 dark:bg-zinc-900 border-t border-gray-200 dark:border-white/5 space-y-4">
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <span className="text-sm font-medium text-zinc-700 dark:text-gray-300">
                              Query
                            </span>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white h-7 shrink-0"
                              onClick={(event) => {
                                event.stopPropagation();
                                navigator.clipboard.writeText(log.query);
                              }}
                            >
                              <Copy className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                          </div>

                          <div className="p-3 rounded bg-white dark:bg-[#1a1f2e] text-sm text-zinc-700 dark:text-gray-300 font-mono break-words whitespace-pre-wrap max-h-60 overflow-y-auto">
                            {log.query}
                          </div>
                        </div>
                        {log.response_preview && (
                          <div>
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <span className="text-sm font-medium text-zinc-700 dark:text-gray-300">
                                Response Preview
                              </span>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white h-7 shrink-0"
                                onClick={(event) => {
                                  event.stopPropagation();

                                  navigator.clipboard.writeText(
                                    log.response_preview,
                                  );
                                }}
                              >
                                <Copy className="w-3 h-3 mr-1" />
                                Copy
                              </Button>
                            </div>

                            <div className="p-3 rounded bg-white dark:bg-[#1a1f2e] text-sm text-zinc-700 dark:text-gray-300 font-mono break-words whitespace-pre-wrap max-h-80 overflow-y-auto">
                              {log.response_preview}
                            </div>
                          </div>
                        )}
                        {log.error_message && (
                          <div>
                            <span className="text-sm font-medium text-red-600 dark:text-red-400">
                              Error
                            </span>

                            <div className="p-3 rounded bg-red-50 dark:bg-red-500/10 text-sm text-red-700 dark:text-red-300 font-mono mt-2 break-words whitespace-pre-wrap">
                              {log.error_message}
                            </div>
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <div className="rounded-md bg-white dark:bg-white/5 p-3">
                            <span className="block text-gray-400 mb-1">
                              Tokens Input
                            </span>
                            <span className="font-medium text-zinc-700 dark:text-gray-200">
                              {log.tokens_input.toLocaleString()}
                            </span>
                          </div>

                          <div className="rounded-md bg-white dark:bg-white/5 p-3">
                            <span className="block text-gray-400 mb-1">
                              Tokens Output
                            </span>
                            <span className="font-medium text-zinc-700 dark:text-gray-200">
                              {log.tokens_output.toLocaleString()}
                            </span>
                          </div>

                          <div className="rounded-md bg-white dark:bg-white/5 p-3">
                            <span className="block text-gray-400 mb-1">
                              Total Tokens
                            </span>
                            <span className="font-medium text-zinc-700 dark:text-gray-200">
                              {log.tokens_total.toLocaleString()}
                            </span>
                          </div>

                          <div className="rounded-md bg-white dark:bg-white/5 p-3">
                            <span className="block text-gray-400 mb-1">
                              Response Time
                            </span>
                            <span className="font-medium text-zinc-700 dark:text-gray-200">
                              {log.response_time_ms} ms
                            </span>
                          </div>

                          <div className="rounded-md bg-white dark:bg-white/5 p-3">
                            <span className="block text-gray-400 mb-1">
                              RAG Chunks
                            </span>
                            <span className="font-medium text-zinc-700 dark:text-gray-200">
                              {log.rag_chunks_used}
                            </span>
                          </div>

                          <div className="rounded-md bg-white dark:bg-white/5 p-3">
                            <span className="block text-gray-400 mb-1">
                              RAG Relevance
                            </span>

                            <span className="font-medium text-zinc-700 dark:text-gray-200">
                              {log.rag_relevance_score
                                ? `${(log.rag_relevance_score * 100).toFixed(
                                    1,
                                  )}%`
                                : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {mockLogs.length < total && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-white/10"
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Load More ({mockLogs.length} / {total})
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </div>
  );
}
