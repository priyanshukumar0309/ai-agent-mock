import { useState, useCallback, useRef } from 'react';
import type {
  ChatMessage,
  LogEntry,
  SystemStatuses,
  DemoScenario,
} from '../data/types';

interface DemoState {
  messages: ChatMessage[];
  logEntries: LogEntry[];
  systemStatuses: SystemStatuses;
  isThinking: boolean;
  isRunning: boolean;
  isComplete: boolean;
  confirmationSent: boolean;
  activeScenarioId: string | null;
}

const initialStatuses: SystemStatuses = {
  servicenow: 'idle',
  sap: 'idle',
  workato: 'idle',
  outlook: 'idle',
  teams: 'idle',
  sharepoint: 'idle',
  medius: 'idle',
  sap_p60: 'idle',
  sap_p72: 'idle',
  ai_agent: 'idle',
};

function addMessageIfAbsent(
  messages: ChatMessage[],
  id: string,
  msg: Omit<ChatMessage, 'id'>
): ChatMessage[] {
  if (messages.some((m) => m.id === id)) return messages;
  return [...messages, { ...msg, id }];
}

function addLogIfAbsent(
  entries: LogEntry[],
  entry: LogEntry
): LogEntry[] {
  if (entries.some((e) => e.id === entry.id)) return entries;
  return [...entries, entry];
}

export function useDemoSequence() {
  const [state, setState] = useState<DemoState>({
    messages: [],
    logEntries: [],
    systemStatuses: { ...initialStatuses },
    isThinking: false,
    isRunning: false,
    isComplete: false,
    confirmationSent: false,
    activeScenarioId: null,
  });

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scenarioIdRef = useRef<string | null>(null);
  const runningRef = useRef(false);
  const confirmSentRef = useRef(false);

  const reset = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    scenarioIdRef.current = null;
    runningRef.current = false;
    confirmSentRef.current = false;
    setState({
      messages: [],
      logEntries: [],
      systemStatuses: { ...initialStatuses },
      isThinking: false,
      isRunning: false,
      isComplete: false,
      confirmationSent: false,
      activeScenarioId: null,
    });
  }, []);

  const startScenario = useCallback(
    (scenario: DemoScenario) => {
      reset();

      if (runningRef.current) return;
      runningRef.current = true;

      scenarioIdRef.current = scenario.id;
      setState((s) => ({
        ...s,
        isRunning: true,
        isComplete: false,
        activeScenarioId: scenario.id,
      }));

      let cumulativeDelay = 0;

      scenario.events.forEach((event, index) => {
        cumulativeDelay += event.delay;
        const isLast = index === scenario.events.length - 1;
        const eventId = `scenario-${index}`;

        const t = setTimeout(() => {
          setState((prev) => {
            const next = { ...prev };

            switch (event.type) {
              case 'user-message':
                next.messages = addMessageIfAbsent(prev.messages, eventId, {
                  role: 'user',
                  content: event.content!,
                  attachment: event.attachment,
                  timestamp: new Date(),
                });
                break;

              case 'agent-message':
                next.messages = addMessageIfAbsent(prev.messages, eventId, {
                  role: 'agent',
                  content: event.content!,
                  showTable: event.showTable,
                  tableType: event.tableType,
                  showConfirmation: event.showConfirmation,
                  confirmLabel: event.confirmLabel,
                  timestamp: new Date(),
                });
                break;

              case 'log-entry':
                next.logEntries = addLogIfAbsent(prev.logEntries, {
                  id: event.logId || eventId,
                  content: event.content!,
                  status: event.logStatus || 'running',
                  system: event.logSystem,
                });
                break;

              case 'log-done':
                next.logEntries = prev.logEntries.map((e) =>
                  e.id === event.logId ? { ...e, status: 'done' as const } : e
                );
                break;

              case 'show-thinking':
                next.isThinking = true;
                break;

              case 'hide-thinking':
                next.isThinking = false;
                break;

              case 'system-status':
                next.systemStatuses = {
                  ...prev.systemStatuses,
                  ...event.systemUpdates,
                };
                break;
            }

            return next;
          });
        }, cumulativeDelay);

        timeoutsRef.current.push(t);
      });
    },
    [reset]
  );

  const runArPaymentConfirmation = useCallback(() => {
    const t1 = setTimeout(() => {
      setState((s) => ({
        ...s,
        isThinking: true,
        systemStatuses: { ...s.systemStatuses, servicenow: 'active' },
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'confirm-1',
          content: 'Escalating invoice 91SISAAC4182 to FO approval team via ServiceNow',
          status: 'running',
          system: 'servicenow',
        }),
      }));
    }, 400);

    const t2 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'confirm-1' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'confirm-2',
            content: 'Updating case FR3446746 with current invoice status summary',
            status: 'running',
            system: 'servicenow',
          }
        ),
      }));
    }, 1000);

    const t3 = setTimeout(() => {
      setState((s) => ({
        ...s,
        systemStatuses: { ...s.systemStatuses, servicenow: 'complete', outlook: 'active' },
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'confirm-2' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'confirm-3',
            content: 'Sending escalation email to FO approval team with invoice 91SISAAC4182 details via Outlook',
            status: 'running',
            system: 'outlook',
          }
        ),
      }));
    }, 1600);

    const t4 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'confirm-3' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'confirm-4',
            content: 'Composing approval request email to FO manager with full aging report attached',
            status: 'running',
            system: 'outlook',
          }
        ),
      }));
    }, 2200);

    const emailSentId = 'confirm-msg-email-sent';
    const t5 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: s.logEntries.map((e) =>
          e.id === 'confirm-4' ? { ...e, status: 'done' as const } : e
        ),
        messages: addMessageIfAbsent(s.messages, emailSentId, {
          role: 'agent',
          content: 'Escalation email has been sent to Henrik Larsson (Senior Manager, Financial Operations) requesting approval for invoice 91SISAAC4182.',
          showEmailCard: 'sent',
          timestamp: new Date(),
        }),
      }));
    }, 2800);

    const t6 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'confirm-5',
          content: 'Awaiting FO manager email response...',
          status: 'running',
          system: 'outlook',
        }),
      }));
    }, 3400);

    const approvalId = 'confirm-msg-approval';
    const t7 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: s.logEntries.map((e) =>
          e.id === 'confirm-5'
            ? { ...e, status: 'done' as const, content: 'FO manager approval received via Outlook' }
            : e
        ),
        messages: addMessageIfAbsent(s.messages, approvalId, {
          role: 'agent',
          content: 'FO manager Henrik Larsson has approved the payment release for invoice 91SISAAC4182 via email. Proceeding to notify the team via Microsoft Teams.',
          showEmailCard: 'approval',
          timestamp: new Date(),
        }),
      }));
    }, 8400);

    const t8 = setTimeout(() => {
      setState((s) => ({
        ...s,
        systemStatuses: { ...s.systemStatuses, outlook: 'complete', teams: 'active' },
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'confirm-6',
          content: 'Posting approval confirmation to #finance-approvals Teams channel with @mention to FO team lead',
          status: 'running',
          system: 'teams',
        }),
      }));
    }, 9200);

    const t9 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'confirm-6' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'confirm-7',
            content: 'Sending dealer status notification with invoice summary to Rola Volvo Cars Somerset West via Teams',
            status: 'running',
            system: 'teams',
          }
        ),
      }));
    }, 9800);

    const finalId = 'confirm-msg-final';
    const t10 = setTimeout(() => {
      setState((s) => ({
        ...s,
        isThinking: false,
        isRunning: false,
        isComplete: true,
        systemStatuses: { ...s.systemStatuses, teams: 'complete' },
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'confirm-7' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'confirm-8',
            content: 'All actions completed and logged',
            status: 'done',
          }
        ),
        messages: addMessageIfAbsent(s.messages, finalId, {
          role: 'agent',
          content: 'All done. Case FR3446746 is updated, the #finance-approvals Teams channel has been notified, and a full status summary has been sent to Rola Volvo Cars Somerset West. The 3 invoices marked as Free for Payment will be processed in the next payment cycle. Is there anything else I can help with?',
          timestamp: new Date(),
        }),
      }));
    }, 10600);

    timeoutsRef.current.push(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10);
  }, []);

  const runShortPaymentConfirmation = useCallback(() => {
    const t1 = setTimeout(() => {
      setState((s) => ({
        ...s,
        isThinking: true,
        systemStatuses: { ...s.systemStatuses, servicenow: 'active' },
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'sp-confirm-1',
          content: 'Creating GR expedite request for delivery note DN-9981204 via ServiceNow',
          status: 'running',
          system: 'servicenow',
        }),
      }));
    }, 400);

    const t2 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'sp-confirm-1' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'sp-confirm-2',
            content: 'Identifying warehouse SPOC via Purchase Order ME23N lookup',
            status: 'running',
            system: 'sap',
          }
        ),
        systemStatuses: { ...s.systemStatuses, sap: 'active' },
      }));
    }, 1000);

    const t3 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'sp-confirm-2' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'sp-confirm-3',
            content: 'SPOC identified: Maria Andersson (Torslanda Plant). Composing GR expedite email via Outlook',
            status: 'running',
            system: 'outlook',
          }
        ),
        systemStatuses: { ...s.systemStatuses, servicenow: 'complete', sap: 'complete', outlook: 'active' },
      }));
    }, 1600);

    const t4 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'sp-confirm-3' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'sp-confirm-4',
            content: 'Attaching GR/IR mismatch report and delivery note details to email',
            status: 'running',
            system: 'outlook',
          }
        ),
      }));
    }, 2200);

    const emailSentId = 'sp-msg-email-sent';
    const t5 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: s.logEntries.map((e) =>
          e.id === 'sp-confirm-4' ? { ...e, status: 'done' as const } : e
        ),
        messages: addMessageIfAbsent(s.messages, emailSentId, {
          role: 'agent',
          content: 'GR expedite request has been sent to Maria Andersson (Warehouse SPOC, Torslanda Plant) requesting Goods Receipt posting for delivery note DN-9981204 (100 units).',
          showEmailCard: 'warehouse-sent',
          timestamp: new Date(),
        }),
      }));
    }, 2800);

    const t6 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'sp-confirm-5',
          content: 'Awaiting warehouse SPOC confirmation...',
          status: 'running',
          system: 'outlook',
        }),
      }));
    }, 3400);

    const confirmedId = 'sp-msg-gr-confirmed';
    const t7 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: s.logEntries.map((e) =>
          e.id === 'sp-confirm-5'
            ? { ...e, status: 'done' as const, content: 'Warehouse SPOC confirmed GR posting via Outlook' }
            : e
        ),
        messages: addMessageIfAbsent(s.messages, confirmedId, {
          role: 'agent',
          content: 'Warehouse SPOC Maria Andersson has confirmed that the Goods Receipt for DN-9981204 (100 units) has been posted in SAP. The payment block on invoice SE7200891 will now be automatically released.',
          showEmailCard: 'warehouse-confirmed',
          timestamp: new Date(),
        }),
      }));
    }, 8400);

    const t8 = setTimeout(() => {
      setState((s) => ({
        ...s,
        systemStatuses: { ...s.systemStatuses, outlook: 'complete', teams: 'active' },
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'sp-confirm-6',
          content: 'Posting GR confirmation update to #warehouse-ops Teams channel',
          status: 'running',
          system: 'teams',
        }),
      }));
    }, 9200);

    const t9 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'sp-confirm-6' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'sp-confirm-7',
            content: 'Sending payment release notification to Lindstrom Logistics via Teams',
            status: 'running',
            system: 'teams',
          }
        ),
      }));
    }, 9800);

    const finalId = 'sp-msg-final';
    const t10 = setTimeout(() => {
      setState((s) => ({
        ...s,
        isThinking: false,
        isRunning: false,
        isComplete: true,
        systemStatuses: { ...s.systemStatuses, teams: 'complete' },
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'sp-confirm-7' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'sp-confirm-8',
            content: 'All actions completed and logged',
            status: 'done',
          }
        ),
        messages: addMessageIfAbsent(s.messages, finalId, {
          role: 'agent',
          content: 'All done. The Goods Receipt for DN-9981204 has been posted, the payment block on invoice SE7200891 is released, and the remaining EUR 3,000 will be processed in the next payment run. The ServiceNow ticket has been updated and Lindstrom Logistics has been notified via Teams. Is there anything else I can help with?',
          timestamp: new Date(),
        }),
      }));
    }, 10600);

    timeoutsRef.current.push(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10);
  }, []);

  const runChinesePodConfirmation = useCallback(() => {
    const t1 = setTimeout(() => {
      setState((s) => ({
        ...s,
        isThinking: true,
        systemStatuses: { ...s.systemStatuses, servicenow: 'active' },
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'cn-confirm-1',
          content: '在 ServiceNow 中创建收货确认催办工单',
          status: 'running',
          system: 'servicenow',
        }),
      }));
    }, 400);

    const t2 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'cn-confirm-1' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'cn-confirm-2',
            content: '附加POD凭证至工单 -- 收货确认书签发日期 24/02/2025',
            status: 'running',
            system: 'servicenow',
          }
        ),
      }));
    }, 1000);

    const t3 = setTimeout(() => {
      setState((s) => ({
        ...s,
        systemStatuses: { ...s.systemStatuses, servicenow: 'complete', outlook: 'active' },
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'cn-confirm-2' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'cn-confirm-3',
            content: '通过 Outlook 向成都工厂仓储负责人张伟发送收货确认请求',
            status: 'running',
            system: 'outlook',
          }
        ),
      }));
    }, 1600);

    const t4 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'cn-confirm-3' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'cn-confirm-4',
            content: '附加交货明细及POD扫描件至邮件',
            status: 'running',
            system: 'outlook',
          }
        ),
      }));
    }, 2200);

    const emailSentId = 'cn-msg-email-sent';
    const t5 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: s.logEntries.map((e) =>
          e.id === 'cn-confirm-4' ? { ...e, status: 'done' as const } : e
        ),
        messages: addMessageIfAbsent(s.messages, emailSentId, {
          role: 'agent',
          content: '收货确认请求邮件已发送给张伟（成都工厂仓储运营主管），请求对交货单 DN-CHN-20241210 的4笔交货记录（共192件）进行系统收货确认。',
          showEmailCard: 'cn-sent',
          timestamp: new Date(),
        }),
      }));
    }, 2800);

    const t6 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'cn-confirm-5',
          content: '等待仓储负责人回复...',
          status: 'running',
          system: 'outlook',
        }),
      }));
    }, 3400);

    const approvalId = 'cn-msg-approval';
    const t7 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: s.logEntries.map((e) =>
          e.id === 'cn-confirm-5'
            ? { ...e, status: 'done' as const, content: '仓储负责人已通过 Outlook 确认收货' }
            : e
        ),
        messages: addMessageIfAbsent(s.messages, approvalId, {
          role: 'agent',
          content: '成都工厂仓储负责人张伟已确认：交货单 DN-CHN-20241210 的所有4笔交货记录（共192件）已在SAP系统中完成收货确认过账。付款冻结将自动解除。正在通过 Teams 通知相关团队。',
          showEmailCard: 'cn-approval',
          timestamp: new Date(),
        }),
      }));
    }, 8400);

    const t8 = setTimeout(() => {
      setState((s) => ({
        ...s,
        systemStatuses: { ...s.systemStatuses, outlook: 'complete', teams: 'active' },
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'cn-confirm-6',
          content: '在 #apac-finance Teams 频道发布收货确认通知',
          status: 'running',
          system: 'teams',
        }),
      }));
    }, 9200);

    const t9 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'cn-confirm-6' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'cn-confirm-7',
            content: '通过 Teams 向博世汽车部件(苏州)发送付款状态更新',
            status: 'running',
            system: 'teams',
          }
        ),
      }));
    }, 9800);

    const finalId = 'cn-msg-final';
    const t10 = setTimeout(() => {
      setState((s) => ({
        ...s,
        isThinking: false,
        isRunning: false,
        isComplete: true,
        systemStatuses: { ...s.systemStatuses, teams: 'complete' },
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'cn-confirm-7' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'cn-confirm-8',
            content: '所有操作已完成并记录',
            status: 'done',
          }
        ),
        messages: addMessageIfAbsent(s.messages, finalId, {
          role: 'agent',
          content: '全部处理完成。交货单 DN-CHN-20241210 的收货确认已过账，付款冻结已解除，相关发票将在下一个付款周期中处理。ServiceNow 工单已更新，#apac-finance Teams 频道已收到通知，博世汽车部件(苏州)已通过 Teams 收到付款状态更新。请问还有其他需要帮助的吗？',
          timestamp: new Date(),
        }),
      }));
    }, 10600);

    timeoutsRef.current.push(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10);
  }, []);

  const runAribaInvoiceConfirmation = useCallback(() => {
    const t1 = setTimeout(() => {
      setState((s) => ({
        ...s,
        isThinking: true,
        systemStatuses: { ...s.systemStatuses, outlook: 'active' },
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'ariba-confirm-1',
          content: 'Composing invoice forwarding email to Volvo Cars US scanning team',
          status: 'running',
          system: 'outlook',
        }),
      }));
    }, 400);

    const t2 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'ariba-confirm-1' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'ariba-confirm-2',
            content: 'Attaching invoice PDF 99086498_T106284.pdf with vendor metadata AERYJ',
            status: 'running',
            system: 'outlook',
          }
        ),
      }));
    }, 1000);

    const emailSentId = 'ariba-msg-email-sent';
    const t3 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: s.logEntries.map((e) =>
          e.id === 'ariba-confirm-2' ? { ...e, status: 'done' as const } : e
        ),
        messages: addMessageIfAbsent(s.messages, emailSentId, {
          role: 'agent',
          content: 'Invoice has been forwarded to the Volvo Cars US Operations scanning team for registration in SAP VIM workflow.',
          showEmailCard: 'invoice-scanning-sent',
          timestamp: new Date(),
        }),
      }));
    }, 1600);

    const t4 = setTimeout(() => {
      setState((s) => ({
        ...s,
        systemStatuses: { ...s.systemStatuses, outlook: 'complete', servicenow: 'active' },
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'ariba-confirm-3',
          content: 'Updating ServiceNow case with scanning confirmation and payment schedule',
          status: 'running',
          system: 'servicenow',
        }),
      }));
    }, 2200);

    const t5 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'ariba-confirm-3' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'ariba-confirm-4',
            content: 'Composing payment schedule confirmation email to Carlos Juarez (JoysonQuin)',
            status: 'running',
            system: 'outlook',
          }
        ),
        systemStatuses: { ...s.systemStatuses, servicenow: 'complete', outlook: 'active' },
      }));
    }, 2800);

    const confirmId = 'ariba-msg-confirmed';
    const t6 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: s.logEntries.map((e) =>
          e.id === 'ariba-confirm-4' ? { ...e, status: 'done' as const } : e
        ),
        messages: addMessageIfAbsent(s.messages, confirmId, {
          role: 'agent',
          content: 'Payment schedule confirmation has been sent to Carlos Juarez at JoysonQuin Automotive Systems with the registered invoice details and payment due date.',
          showEmailCard: 'invoice-scanning-confirmed',
          timestamp: new Date(),
        }),
      }));
    }, 3400);

    const t7 = setTimeout(() => {
      setState((s) => ({
        ...s,
        systemStatuses: { ...s.systemStatuses, outlook: 'complete', teams: 'active' },
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'ariba-confirm-5',
          content: 'Posting invoice registration update to #us-ap-operations Teams channel',
          status: 'running',
          system: 'teams',
        }),
      }));
    }, 4000);

    const finalId = 'ariba-msg-final';
    const t8 = setTimeout(() => {
      setState((s) => ({
        ...s,
        isThinking: false,
        isRunning: false,
        isComplete: true,
        systemStatuses: { ...s.systemStatuses, teams: 'complete' },
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'ariba-confirm-5' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'ariba-confirm-6',
            content: 'All actions completed and logged',
            status: 'done',
          }
        ),
        messages: addMessageIfAbsent(s.messages, finalId, {
          role: 'agent',
          content: 'All done. Invoice 99086498 has been registered in the system, Carlos Juarez has received the payment schedule confirmation (due date 25.03.2025), and the ServiceNow case has been updated. The #us-ap-operations Teams channel has been notified. Is there anything else I can help with?',
          timestamp: new Date(),
        }),
      }));
    }, 4800);

    timeoutsRef.current.push(t1, t2, t3, t4, t5, t6, t7, t8);
  }, []);

  const runDefaultConfirmation = useCallback(() => {
    const t1 = setTimeout(() => {
      setState((s) => ({
        ...s,
        isThinking: true,
        logEntries: addLogIfAbsent(s.logEntries, {
          id: 'confirm-1',
          content: 'Creating ServiceNow ticket and attaching documentation',
          status: 'running',
          system: 'servicenow',
        }),
      }));
    }, 400);

    const t2 = setTimeout(() => {
      setState((s) => ({
        ...s,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'confirm-1' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'confirm-2',
            content: 'Sending notification via Workato to operations team',
            status: 'running',
            system: 'workato',
          }
        ),
      }));
    }, 1200);

    const doneId = 'confirm-msg-done';
    const t3 = setTimeout(() => {
      setState((s) => ({
        ...s,
        isThinking: false,
        isRunning: false,
        isComplete: true,
        logEntries: addLogIfAbsent(
          s.logEntries.map((e) =>
            e.id === 'confirm-2' ? { ...e, status: 'done' as const } : e
          ),
          {
            id: 'confirm-3',
            content: 'All actions completed and logged',
            status: 'done',
          }
        ),
        messages: addMessageIfAbsent(s.messages, doneId, {
          role: 'agent',
          content: 'Done. I have created ServiceNow ticket INC00892341 and sent a notification to the operations team with the full report attached. They will process this within 24-48 hours. You will receive an email confirmation shortly. Is there anything else I can help with?',
          timestamp: new Date(),
        }),
      }));
    }, 2200);

    timeoutsRef.current.push(t1, t2, t3);
  }, []);

  const sendConfirmation = useCallback(() => {
    if (confirmSentRef.current) return;
    confirmSentRef.current = true;

    const scenarioId = scenarioIdRef.current;
    const confirmMsgId = 'user-confirm';
    const confirmText = scenarioId === 'chinese-pod-query'
      ? '是的，请立即处理。'
      : 'Yes, please go ahead.';

    setState((prev) => ({
      ...prev,
      confirmationSent: true,
      messages: addMessageIfAbsent(prev.messages, confirmMsgId, {
        role: 'user',
        content: confirmText,
        timestamp: new Date(),
      }),
    }));

    if (scenarioId === 'ar-payment-followup') {
      runArPaymentConfirmation();
    } else if (scenarioId === 'short-payment') {
      runShortPaymentConfirmation();
    } else if (scenarioId === 'chinese-pod-query') {
      runChinesePodConfirmation();
    } else if (scenarioId === 'ariba-invoice-creation') {
      runAribaInvoiceConfirmation();
    } else {
      runDefaultConfirmation();
    }
  }, [runArPaymentConfirmation, runShortPaymentConfirmation, runChinesePodConfirmation, runAribaInvoiceConfirmation, runDefaultConfirmation]);

  return {
    ...state,
    startScenario,
    reset,
    sendConfirmation,
  };
}
