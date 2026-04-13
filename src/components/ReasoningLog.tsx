import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle, Loader2 } from 'lucide-react';
import type { LogEntry, SystemName } from '../data/types';

interface Props {
  entries: LogEntry[];
}

function systemLabel(s?: SystemName) {
  switch (s) {
    case 'servicenow': return 'ServiceNow';
    case 'sap': return 'SAP ECC';
    case 'sap_p60': return 'S4 P60';
    case 'sap_p72': return 'S4 P72';
    case 'workato': return 'Workato';
    case 'medius': return 'Medius';
    case 'outlook': return 'Outlook';
    case 'teams': return 'MS Teams';
    case 'sharepoint': return 'SharePoint';
    case 'ai_agent': return 'AI Agent';
    default: return null;
  }
}

function systemColor(s?: SystemName) {
  switch (s) {
    case 'servicenow': return 'bg-emerald-100 text-emerald-700';
    case 'sap': return 'bg-blue-100 text-blue-700';
    case 'sap_p60': return 'bg-blue-100 text-blue-700';
    case 'sap_p72': return 'bg-blue-100 text-blue-700';
    case 'workato': return 'bg-orange-100 text-orange-700';
    case 'medius': return 'bg-teal-100 text-teal-700';
    case 'outlook': return 'bg-sky-100 text-sky-700';
    case 'teams': return 'bg-violet-100 text-violet-700';
    case 'sharepoint': return 'bg-cyan-100 text-cyan-700';
    case 'ai_agent': return 'bg-blue-100 text-blue-700';
    default: return 'bg-snow-200 text-snow-600';
  }
}

export function ReasoningLog({ entries }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [entries]);

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 pb-3 pt-3">
        {entries.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-[11px] text-snow-400">Awaiting agent activity...</p>
          </div>
        ) : (
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {entries.map((entry) => {
                const label = systemLabel(entry.system);
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex items-start gap-2.5 py-1.5"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {entry.status === 'running' ? (
                        <div className="w-5 h-5 relative">
                          <div className="absolute inset-0 rounded-full border-2 border-snow-200" />
                          <div className="absolute inset-0 rounded-full border-2 border-volvo-blue border-t-transparent animate-spin-ring" />
                        </div>
                      ) : entry.status === 'alert' ? (
                        <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                          <AlertTriangle size={10} className="text-volvo-amber" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                          <Check size={10} className="text-volvo-green" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {label && (
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-medium ${systemColor(entry.system)}`}>
                            {label}
                          </span>
                        )}
                        <span className={`text-[11px] leading-snug ${
                          entry.status === 'alert'
                            ? 'text-volvo-amber font-medium'
                            : entry.status === 'running'
                              ? 'text-snow-700'
                              : 'text-snow-500'
                        }`}>
                          {entry.content}
                        </span>
                      </div>
                    </div>
                    {entry.status === 'running' && (
                      <Loader2 size={10} className="text-snow-400 animate-spin-ring mt-1 flex-shrink-0" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
