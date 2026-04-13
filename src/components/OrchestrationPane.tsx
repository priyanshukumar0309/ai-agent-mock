import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { SystemStatuses, LogEntry } from '../data/types';
import { SystemLinks } from './SystemLinks';
import { ReasoningLog } from './ReasoningLog';

interface Props {
  systemStatuses: SystemStatuses;
  logEntries: LogEntry[];
  isRunning: boolean;
}

export function OrchestrationPane({ systemStatuses, logEntries, isRunning }: Props) {
  const [systemsHeight, setSystemsHeight] = useState(50);
  const [isSystemsExpanded, setIsSystemsExpanded] = useState(false);

  const handleSystemsExpand = () => {
    setIsSystemsExpanded(!isSystemsExpanded);
    if (systemsHeight !== 50) {
      setSystemsHeight(50);
    }
  };

  const handleReasoningExpand = () => {
    if (systemsHeight === 20) {
      setSystemsHeight(50);
    } else {
      setSystemsHeight(20);
    }
  };

  const handleSystemsCollapse = () => {
    if (systemsHeight === 80) {
      setSystemsHeight(50);
    } else {
      setSystemsHeight(80);
    }
  };

  return (
    <div className="flex flex-col h-full bg-snow-50 border-l border-snow-200">
      <div className="px-4 py-4 border-b border-snow-200">
        <h2 className="text-xs font-semibold text-snow-800 tracking-wide">
          Orchestration Panel
        </h2>
        <p className="text-[10px] text-snow-400 mt-0.5">
          Real-time agent processing view
        </p>
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        <div
          className="border-b border-snow-200 overflow-y-auto transition-all duration-300"
          style={{ height: `${systemsHeight}%` }}
        >
          <div className="px-3 py-2 border-b border-snow-200 flex items-center justify-between">
            <h3 className="text-[10px] uppercase tracking-widest text-snow-500 font-semibold">
              Connected Systems
            </h3>
            <div className="flex gap-1">
              <button
                onClick={handleSystemsExpand}
                className="p-1 hover:bg-snow-100 rounded transition-colors"
                title={isSystemsExpanded ? "Collapse" : "Expand"}
              >
                {isSystemsExpanded ? (
                  <ChevronUp size={12} className="text-snow-500" />
                ) : (
                  <ChevronDown size={12} className="text-snow-500" />
                )}
              </button>
              <button
                onClick={handleSystemsCollapse}
                className="p-1 hover:bg-snow-100 rounded transition-colors text-[10px] text-snow-500"
                title="Maximize Connected Systems"
              >
                ↕
              </button>
            </div>
          </div>
          <SystemLinks statuses={systemStatuses} isRunning={isRunning} isExpanded={isSystemsExpanded} />
        </div>
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="px-3 py-2 border-b border-snow-200 flex items-center justify-between">
            <h3 className="text-[10px] uppercase tracking-widest text-snow-500 font-semibold">
              Agent Processing
            </h3>
            <button
              onClick={handleReasoningExpand}
              className="p-1 hover:bg-snow-100 rounded transition-colors text-[10px] text-snow-500"
              title="Maximize Agent Processing"
            >
              ↕
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <ReasoningLog entries={logEntries} />
          </div>
        </div>
      </div>
    </div>
  );
}
