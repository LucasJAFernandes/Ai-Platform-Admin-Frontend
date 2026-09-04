import { CreatedTenantResult, Module } from '@/lib/types/tenant-creation.types';
import {
  HardDriveDownload,
  Cloud,
  HardDrive,
  Sparkles,
  Mic,
  Video,
  Phone,
  Bot,
  Languages,
  Users,
  Monitor,
  Code2,
  Shield,
} from 'lucide-react';

export const mockCreatedTenantResult: CreatedTenantResult = {
  id: 187,
  name: 'Vertex Dynamics',
  plan: {
    id: 2,
    name: 'Professional',
  },
  contact_email: 'admin@vertexdynamics.com',
  credentials: {
    temporary_password: 'Vx9#kLm2Qp',
  },
};

export const mockmodules: Module[] = [
  {
    id: 'drive-1',
    name: 'Google Drive',
    description:
      'Adapt your meetings with Google Drive integration, allowing you to access and share your files seamlessly during conversations.',
    price: '€ 18,40',
    priceValue: 18.4,
    period: '/month',
    icon: HardDriveDownload,
    badge: 'Users preferential',
    category: 'drive',
  },
  {
    id: 'drive-2',
    name: 'Google Drive Pro',
    description:
      'Enhanced Google Drive integration with advanced sharing permissions and real-time collaboration features.',
    price: '€ 25,90',
    priceValue: 25.9,
    period: '/month',
    icon: HardDriveDownload,
    category: 'drive',
  },
  {
    id: 'drive-3',
    name: 'Cloud Storage',
    description:
      'Secure cloud storage for all your meeting recordings and shared files with automatic backup.',
    price: '€ 15,00',
    priceValue: 15.0,
    period: '/month',
    icon: Cloud,
    category: 'drive',
  },
  {
    id: 'drive-4',
    name: 'Dropbox Integration',
    description:
      'Seamless integration with Dropbox for file sharing and storage during meetings.',
    price: '€ 16,50',
    priceValue: 16.5,
    period: '/month',
    icon: HardDrive,
    category: 'drive',
  },

  {
    id: 'ai-1',
    name: 'AI advanced for good response',
    description:
      'IA model advanced for allows you to have a more natural conversation with the bot, making it more efficient and accurate in understanding your needs.',
    price: '€ 20,49',
    priceValue: 20.49,
    period: '/month',
    icon: Sparkles,
    badge: 'Most Popular',
    category: 'ai',
  },
  {
    id: 'ai-2',
    name: 'AI Transcription',
    description:
      'Real-time AI-powered transcription of all meetings with speaker identification and keyword highlighting.',
    price: '€ 22,90',
    priceValue: 22.9,
    period: '/month',
    icon: Mic,
    category: 'ai',
  },
  {
    id: 'ai-3',
    name: 'AI Translation',
    description:
      'Real-time translation of meetings in over 50 languages with natural voice synthesis.',
    price: '€ 30,00',
    priceValue: 30.0,
    period: '/month',
    icon: Languages,
    category: 'ai',
  },
  {
    id: 'ai-4',
    name: 'AI Meeting Summary',
    description:
      'Automated meeting summaries with action items and key decisions highlighted.',
    price: '€ 15,90',
    priceValue: 15.9,
    period: '/month',
    icon: Bot,
    category: 'ai',
  },
  {
    id: 'other-1',
    name: 'Support 24/7',
    description:
      'Support with a assist team available 24/7 to help you with any questions or issues you may have, ensuring that you always have the assistance you need.',
    price: '€ 46,50',
    priceValue: 46.5,
    period: '/month',
    icon: Users,
    category: 'other',
  },
  {
    id: 'other-2',
    name: 'Video Recording',
    description:
      'High-quality video recording of all meetings with cloud storage and easy sharing options.',
    price: '€ 12,90',
    priceValue: 12.9,
    period: '/month',
    icon: Video,
    category: 'other',
  },
  {
    id: 'other-3',
    name: 'Phone Bridge',
    description:
      'Dial-in numbers for participants who prefer to join via phone, available in 50+ countries.',
    price: '€ 35,00',
    priceValue: 35.0,
    period: '/month',
    icon: Phone,
    category: 'other',
  },
  {
    id: 'other-4',
    name: 'Security Plus',
    description:
      'Enhanced security features including end-to-end encryption and advanced access controls.',
    price: '€ 28,50',
    priceValue: 28.5,
    period: '/month',
    icon: Shield,
    category: 'other',
  },
  {
    id: 'other-5',
    name: 'Screen Sharing',
    description:
      'Advanced screen sharing capabilities with annotation tools and remote control options.',
    price: '€ 10,90',
    priceValue: 10.9,
    period: '/month',
    icon: Monitor,
    category: 'other',
  },
  {
    id: 'other-6',
    name: 'Developer Pack',
    description:
      'API access and webhooks for custom integrations and advanced automation.',
    price: '€ 49,90',
    priceValue: 49.9,
    period: '/month',
    icon: Code2,
    category: 'other',
  },
];
