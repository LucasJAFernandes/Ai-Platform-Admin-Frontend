import {
  TicketsResponse,
  SupportTicket,
  TicketMessage,
} from '@/lib/types/support.types';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  HeadphonesIcon,
} from 'lucide-react';

const mockTickets: SupportTicket[] = [
  {
    id: 1,
    ticket_number: 'TCK-1042',
    tenant_name: 'Acme Manufacturing',
    requester_name: 'Maria Silva',
    requester_email: 'maria@acme-manufacturing.com',
    subject: 'Upload de documentos falha aos 50%',
    description:
      'Estou com problemas ao carregar documentos maiores que 50MB. O upload falha sempre depois de chegar aos 50% de progresso.',
    priority: 'high',
    status: 'open',
    category: 'Technical',
    assigned_to_name: 'João Ferreira',
    comment_count: 4,
    created_at: '2026-08-16T10:30:00Z',
    updated_at: '2026-08-16T10:45:00Z',
  },
  {
    id: 2,
    ticket_number: 'TCK-1041',
    tenant_name: 'Northwind Traders',
    requester_name: 'Marco Silva',
    requester_email: 'marco@northwindtraders.io',
    subject: 'Como faço upgrade do plano?',
    description:
      'Gostaríamos de fazer upgrade do plano Professional para Enterprise, que passos preciso seguir?',
    priority: 'medium',
    status: 'in-progress',
    category: 'Billing',
    assigned_to_name: 'Ana Costa',
    comment_count: 2,
    created_at: '2026-08-16T08:10:00Z',
    updated_at: '2026-08-16T09:00:00Z',
  },
  {
    id: 3,
    ticket_number: 'TCK-1039',
    tenant_name: 'Globex Corp',
    requester_name: 'Elena Popov',
    requester_email: 'elena@globexcorp.com',
    subject: 'Erro crítico ao gerar relatórios',
    description:
      'O sistema devolve erro 500 sempre que tentamos gerar o relatório mensal de conformidade.',
    priority: 'critical',
    status: 'escalated',
    category: 'Technical',
    assigned_to_name: 'João Ferreira',
    comment_count: 9,
    created_at: '2026-08-15T14:20:00Z',
    updated_at: '2026-08-16T07:30:00Z',
  },
  {
    id: 4,
    ticket_number: 'TCK-1035',
    tenant_name: 'Initech Solutions',
    requester_name: 'Pedro Almeida',
    requester_email: 'pedro@initech.com',
    subject: 'Pedido de reembolso',
    description:
      'A nossa conta foi suspensa mas fomos cobrados este mês na mesma. Pedimos reembolso do valor.',
    priority: 'urgent',
    status: 'open',
    category: 'Billing',
    assigned_to_name: null,
    comment_count: 1,
    created_at: '2026-08-14T16:00:00Z',
    updated_at: '2026-08-14T16:00:00Z',
  },
  {
    id: 5,
    ticket_number: 'TCK-1030',
    tenant_name: 'Umbrella Health',
    requester_name: 'Diego Fernandes',
    requester_email: 'diego@umbrellahealth.com',
    subject: 'Dúvida sobre exportação de dados',
    description:
      'É possível exportar todos os registos de pacientes num único CSV?',
    priority: 'low',
    status: 'resolved',
    category: 'General',
    assigned_to_name: 'Ana Costa',
    comment_count: 3,
    created_at: '2026-08-12T09:00:00Z',
    updated_at: '2026-08-13T11:00:00Z',
  },
  {
    id: 6,
    ticket_number: 'TCK-1021',
    tenant_name: 'Acme Manufacturing',
    requester_name: 'Sarah Connors',
    requester_email: 'sarah@acme-manufacturing.com',
    subject: 'Conta de utilizador duplicada',
    description:
      'Criámos sem querer uma conta duplicada para um dos nossos utilizadores, podem remover uma?',
    priority: 'low',
    status: 'closed',
    category: 'Account',
    assigned_to_name: 'João Ferreira',
    comment_count: 2,
    created_at: '2026-08-08T10:00:00Z',
    updated_at: '2026-08-09T12:00:00Z',
  },
];

export const mockTicketsResponse: TicketsResponse = {
  tickets: mockTickets,
  total: 214,
  page: 1,
  page_size: 20,
  stats: {
    open_count: 38,
    in_progress_count: 24,
    total_count: 214,
  },
};

export const mockMessages: TicketMessage[] = [
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
];
export const statsData = [
  {
    label: 'Open',
    value: 120,
    icon: AlertTriangle,
    color: 'bg-red-500',
  },
  {
    label: 'In Progress',
    value: 600,
    icon: Clock,
    color: 'bg-yellow-500',
  },
  {
    label: 'Resolved/Closed',
    value: '70%',
    icon: CheckCircle,
    color: 'bg-green-500',
  },
  {
    label: 'Total Tickets',
    value: 1100,
    icon: HeadphonesIcon,
    color: 'bg-blue-500',
  },
];
