export enum Intent {
  NAVIGATION = 'NAVIGATION',
  INFO = 'INFO',
  CORRECTION = 'CORRECTION',
  MEDICAL = 'MEDICAL',
  AMBIGUOUS = 'AMBIGUOUS'
}

export interface AssistantResponse {
  naturalLanguage: string;
  intent: Intent;
  data: {
    location: string;
    action: 'navigate' | 'info' | 'stay' | 'show_options';
    target: string;
    options?: string[];
  };
  status: 'success' | 'need_more_info';
}

export interface MallEntity {
  id: string;
  name: string;
  floor: 'G/F' | '1/F' | '2/F';
  category: 'food' | 'facility' | 'shop' | 'transport' | 'medical';
  description: string;
  tags: string[];
}
