export type SystemName = 'servicenow' | 'sap' | 'workato' | 'outlook' | 'teams' | 'sharepoint' | 'medius' | 'sap_p60' | 'sap_p72' | 'ai_agent';
export type SystemStatus = 'idle' | 'connecting' | 'active' | 'complete';

export type MessageRole = 'user' | 'agent' | 'system';

export type TableType = 'debit-balance' | 'invoice-status';

export type EmailCardType = 'sent' | 'approval' | 'warehouse-sent' | 'warehouse-confirmed' | 'cn-sent' | 'cn-approval' | 'invoice-scanning-sent' | 'invoice-scanning-confirmed';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  showTable?: boolean;
  tableType?: TableType;
  showConfirmation?: boolean;
  confirmLabel?: string;
  showEmailCard?: EmailCardType;
  attachment?: {
    name: string;
    url: string;
    showInline?: boolean;
  };
  timestamp: Date;
}

export interface LogEntry {
  id: string;
  content: string;
  status: 'running' | 'done' | 'alert';
  system?: SystemName;
}

export interface SystemStatuses {
  servicenow: SystemStatus;
  sap: SystemStatus;
  workato: SystemStatus;
  outlook: SystemStatus;
  teams: SystemStatus;
  sharepoint: SystemStatus;
  medius: SystemStatus;
  sap_p60: SystemStatus;
  sap_p72: SystemStatus;
  ai_agent: SystemStatus;
}

export interface DemoEvent {
  delay: number;
  type:
    | 'user-message'
    | 'log-entry'
    | 'agent-message'
    | 'show-thinking'
    | 'hide-thinking'
    | 'system-status'
    | 'log-done';
  content?: string;
  logStatus?: 'running' | 'done' | 'alert';
  logSystem?: SystemName;
  logId?: string;
  highlight?: boolean;
  showTable?: boolean;
  tableType?: TableType;
  showConfirmation?: boolean;
  confirmLabel?: string;
  systemUpdates?: Partial<SystemStatuses>;
  attachment?: {
    name: string;
    url: string;
    showInline?: boolean;
  };
}

export interface DemoScenario {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  events: DemoEvent[];
}
