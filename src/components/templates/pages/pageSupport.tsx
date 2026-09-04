'use client';

import { useState } from 'react';
import { CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Input } from '@/components/atoms/input';
import { formatDate } from '@/lib/utils';
import {
  MessageSquare,
  Search,
  X,
  Send,
  Bot,
  User,
  Users,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatsCards } from '@/components/organisms/statsCards';
import { mockTicketsResponse, statsData } from '@/mocks/support';
import { SupportTicket } from '@/lib/types/support.types';
const statusColors: Record<string, string> = {
  open: 'bg-red-500',
  'in-progress': 'bg-yellow-500',
  resolved: 'bg-green-500',
  escalated: 'bg-purple-500',
  closed: 'bg-gray-500',
};

const priorityColors: Record<string, string> = {
  low: 'border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-400',
  medium:
    'border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-400',
  high: 'border-orange-400 dark:border-orange-500 text-orange-600 dark:text-orange-400',
  urgent: 'border-red-400 dark:border-red-500 text-red-600 dark:text-red-400',
  critical: 'border-red-500 dark:border-red-600 text-red-700 dark:text-red-500',
};

export default function Support() {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null,
  );
  const [openTabs, setOpenTabs] = useState<SupportTicket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const [messages] = useState([
    {
      id: 1,
      sender: 'customer',
      name: 'Maria Silva',
      content:
        "Hi, I'm having trouble uploading documents larger than 50MB. The upload fails after reaching 50% progress.",
      time: '10:30 AM',
    },
    {
      id: 2,
      sender: 'ai',
      name: 'AI Assistant',
      content:
        "I understand you're experiencing issues with large file uploads. Let me check your account settings and recent upload logs.",
      time: '10:31 AM',
    },
    {
      id: 3,
      sender: 'ai',
      name: 'AI Assistant',
      content:
        "I found that your account has a 100MB upload limit, so the file size shouldn't be the issue. Could you please try: 1) Clearing your browser cache, 2) Using a different browser, 3) Checking your network connection stability.",
      time: '10:32 AM',
    },
    {
      id: 4,
      sender: 'customer',
      name: 'Maria Silva',
      content:
        'I tried all of those but the issue persists. The upload fails after 50% progress every time.',
      time: '10:45 AM',
    },
  ]);

  const openTicket = (ticket: SupportTicket) => {
    if (!openTabs.find((t) => t.id === ticket.id)) {
      setOpenTabs([...openTabs, ticket]);
    }
    setSelectedTicket(ticket);
  };

  const closeTab = (ticketId: number) => {
    const newTabs = openTabs.filter((t) => t.id !== ticketId);
    setOpenTabs(newTabs);
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(newTabs[newTabs.length - 1] || null);
    }
  };
  const filteredTickets = mockTicketsResponse.tickets;

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              Support Center
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage support tickets with AI-assisted responses
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

        {mockTicketsResponse.stats && <StatsCards stats={statsData} />}
        <div className="grid md:grid-cols-12 gap-6 mt-5">
          <div className="col-span-10 md:col-span-4 w-full overflow-auto group bg-gray-50 dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 flex flex-col">
            <CardHeader className="pb-3">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search tickets..."
                    className="pl-10 bg-white dark:bg-zinc-900 border-gray-300 dark:border-white/10 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <div className="p-3 space-y-2 w-full">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => openTicket(ticket)}
                  className={cn(
                    'p-3 rounded-lg cursor-pointer transition-all duration-200',
                    selectedTicket?.id === ticket.id
                      ? 'bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20'
                      : 'hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent',
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        statusColors[ticket.status] || 'bg-gray-500',
                      )}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {ticket.ticket_number}
                    </span>
                    {ticket.comment_count > 0 && (
                      <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0 ml-auto">
                        {ticket.comment_count}
                      </Badge>
                    )}
                  </div>
                  <p className="text-zinc-900 dark:text-white text-sm font-medium truncate">
                    {ticket.subject}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                    {ticket.requester_name}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge
                      variant="outline"
                      className={
                        priorityColors[ticket.priority] || priorityColors.medium
                      }
                    >
                      {ticket.priority}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {formatDate(ticket.created_at)}
                    </span>
                  </div>
                  {ticket.assigned_to_name && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Assigned to: {ticket.assigned_to_name}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {mockTicketsResponse.tickets.length < mockTicketsResponse.total && (
              <div className="flex justify-center p-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 dark:border-white/10"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Load More ({mockTicketsResponse.tickets.length} /{' '}
                  {mockTicketsResponse.total})
                </Button>
              </div>
            )}
          </div>
          <div className="col-span-10 md:col-span-8 group bg-gray-50 dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 flex flex-col">
            {openTabs.length > 0 && (
              <div className="flex border-b border-gray-200 dark:border-white/5 overflow-x-auto">
                {openTabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => setSelectedTicket(tab)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 border-r border-gray-200 dark:border-white/5 cursor-pointer min-w-[150px] transition-colors',
                      selectedTicket?.id === tab.id
                        ? 'bg-gray-200 dark:bg-white/10'
                        : 'hover:bg-gray-100 dark:hover:bg-white/5',
                    )}
                  >
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        statusColors[tab.status] || 'bg-gray-500',
                      )}
                    />
                    <span className="text-sm text-zinc-900 dark:text-white truncate flex-1">
                      {tab.ticket_number}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(tab.id);
                      }}
                      className="text-gray-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedTicket ? (
              <div className="">
                <CardHeader className="pb-3 border-b border-gray-200 dark:border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-zinc-900 dark:text-white">
                        {selectedTicket.subject}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {selectedTicket.requester_name} •{' '}
                        {selectedTicket.requester_email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Category: {selectedTicket.category} • Created:{' '}
                        {formatDate(selectedTicket.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${statusColors[selectedTicket.status] || 'bg-gray-500'} text-white capitalize`}
                      >
                        {selectedTicket.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          priorityColors[selectedTicket.priority] ||
                          priorityColors.medium
                        }
                      >
                        {selectedTicket.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <div className="flex-1 p-4 max-h-100 overflow-auto">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-100 dark:bg-blue-500/20">
                        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 max-w-[80%]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-zinc-900 dark:text-white">
                            {selectedTicket.requester_name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDate(selectedTicket.created_at)}
                          </span>
                        </div>
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-500/20 text-sm text-gray-700 dark:text-gray-200">
                          {selectedTicket.description}
                        </div>
                      </div>
                    </div>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          'flex gap-3',
                          msg.sender === 'agent' && 'justify-end',
                        )}
                      >
                        <div
                          className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                            msg.sender === 'customer'
                              ? 'bg-blue-100 dark:bg-blue-500/20'
                              : msg.sender === 'ai'
                                ? 'bg-purple-100 dark:bg-purple-500/20'
                                : 'bg-teal-100 dark:bg-teal-500/20',
                          )}
                        >
                          {msg.sender === 'customer' ? (
                            <User
                              className={cn(
                                'w-4 h-4',
                                msg.sender === 'customer'
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : '',
                              )}
                            />
                          ) : msg.sender === 'ai' ? (
                            <Bot
                              className={cn(
                                'w-4 h-4',
                                msg.sender === 'ai'
                                  ? 'text-purple-600 dark:text-purple-400'
                                  : '',
                              )}
                            />
                          ) : (
                            <Users
                              className={cn(
                                'w-4 h-4',
                                msg.sender === 'agent'
                                  ? 'text-teal-600 dark:text-teal-400'
                                  : '',
                              )}
                            />
                          )}
                        </div>
                        <div className="flex-1 max-w-[80%]">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-zinc-900 dark:text-white">
                              {msg.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {msg.time}
                            </span>
                          </div>
                          <div
                            className={cn(
                              'p-3 rounded-lg text-sm',
                              msg.sender === 'customer'
                                ? 'bg-blue-50 dark:bg-blue-500/20 text-gray-700 dark:text-gray-200'
                                : msg.sender === 'ai'
                                  ? 'bg-purple-50 dark:bg-purple-500/20 text-gray-700 dark:text-gray-200'
                                  : 'bg-teal-50 dark:bg-teal-500/20 text-gray-700 dark:text-gray-200',
                            )}
                          >
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-white/5">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your response..."
                      className="bg-white dark:bg-zinc-900 border-gray-300 dark:border-white/10 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-500">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50 text-gray-400 dark:text-gray-600" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a ticket to view the conversation
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
