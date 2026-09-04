export type TicketStatus =
  'open' | 'in-progress' | 'resolved' | 'escalated' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent' | 'critical';

export interface TicketStats {
  open_count: number;
  in_progress_count: number;
  total_count: number;
}

export interface SupportTicket {
  id: number;
  ticket_number: string;
  tenant_name: string;
  requester_name: string;
  requester_email: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  category: string;
  assigned_to_name: string | null;
  comment_count: number;
  created_at: string;
  updated_at: string;
}

export interface TicketsResponse {
  tickets: SupportTicket[];
  total: number;
  page: number;
  page_size: number;
  stats: TicketStats;
}

export type MessageSender = 'customer' | 'ai' | 'agent';

export interface TicketMessage {
  id: number;
  sender: MessageSender;
  name: string;
  content: string;
  time: string;
}
