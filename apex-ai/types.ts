export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export enum ServiceType {
  CONFIDENTIAL_LLM = 'Confidential LLMs',
  AGENT_BUILDING = 'Custom Agents',
  DATA_SECURITY = 'Data Sovereignty'
}

export interface ContactFormData {
  firmName: string;
  contactName: string;
  email: string;
  interest: ServiceType;
  message: string;
}