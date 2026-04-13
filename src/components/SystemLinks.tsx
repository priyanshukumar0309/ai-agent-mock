import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { SystemStatuses, SystemStatus, SystemName } from '../data/types';
import { ClaudeNode } from './ClaudeNode';
import { GeminiNode } from './GeminiNode';

interface Props {
  statuses: SystemStatuses;
  isRunning: boolean;
  isExpanded: boolean;
}

interface ConnectedSystem {
  key: SystemName;
  label: string;
  sublabel?: string;
  logo: string | null;
}

const leftSystems: ConnectedSystem[] = [
  { key: 'servicenow', label: 'ServiceNow', logo: '/logos/servicenow.png' },
  { key: 'sap', label: 'SAP ECC', logo: '/logos/SAP12.png' },
  { key: 'sap_p60', label: 'S4 P60', sublabel: 'GB11', logo: '/logos/SAP12.png' },
  { key: 'sap_p72', label: 'S4 P72', sublabel: 'SK02', logo: '/logos/SAP12.png' },
  { key: 'medius', label: 'Medius', logo: null },
];

const rightSystems: ConnectedSystem[] = [
  { key: 'outlook', label: 'Outlook', logo: '/logos/outlook.png' },
  { key: 'teams', label: 'Teams', logo: '/logos/teams.png' },
  { key: 'sharepoint', label: 'SharePoint', logo: '/logos/sharepoint.png' },
];

function statusRingColor(status: SystemStatus) {
  switch (status) {
    case 'idle': return 'border-snow-200';
    case 'connecting': return 'border-amber-400';
    case 'active': return 'border-volvo-blue';
    case 'complete': return 'border-emerald-500';
  }
}

function statusBgColor(status: SystemStatus) {
  switch (status) {
    case 'idle': return 'bg-snow-50';
    case 'connecting': return 'bg-amber-50';
    case 'active': return 'bg-blue-50';
    case 'complete': return 'bg-emerald-50';
  }
}

function connectorColor(status: SystemStatus) {
  switch (status) {
    case 'idle': return 'bg-snow-200';
    case 'connecting': return 'bg-amber-300';
    case 'active': return 'bg-volvo-blue';
    case 'complete': return 'bg-emerald-400';
  }
}

function SystemNode({ sys, status, isExpanded }: { sys: ConnectedSystem; status: SystemStatus; isExpanded: boolean }) {
  const isActive = status === 'active' || status === 'connecting';
  const isComplete = status === 'complete';
  const logoSize = isExpanded ? 'w-6 h-6' : 'w-3.5 h-3.5';
  const iconSize = isExpanded ? 'w-9 h-9' : 'w-6 h-6';

  return (
    <motion.div
      layout
      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all duration-300 ${statusBgColor(status)} ${
        isActive
          ? 'border-blue-200 shadow-sm'
          : isComplete
            ? 'border-emerald-200'
            : 'border-snow-200'
      }`}
    >
      <div className={`relative ${iconSize} rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300 ${statusRingColor(status)} ${
        isActive ? 'bg-white' : isComplete ? 'bg-emerald-50' : 'bg-white'
      }`}>
        {isComplete ? (
          <Check size={isExpanded ? 14 : 10} className="text-emerald-600" />
        ) : sys.logo ? (
          <img src={sys.logo} alt={sys.label} className={`${logoSize} object-contain transition-all duration-300 ${!isActive && !isComplete ? 'opacity-40' : 'opacity-100'}`} />
        ) : (
          <span className={`${isExpanded ? 'text-[9px]' : 'text-[7px]'} font-bold leading-none ${isActive ? 'text-volvo-blue' : isComplete ? 'text-emerald-600' : 'text-snow-400'}`}>
            {sys.label.charAt(0)}
          </span>
        )}
        {isActive && (
          <motion.div
            className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-volvo-blue border-[1.5px] border-white"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      <div className="min-w-0">
        <p className={`${isExpanded ? 'text-[10px]' : 'text-[9px]'} font-medium leading-tight transition-all duration-300 ${
          isActive ? 'text-volvo-blue' : isComplete ? 'text-emerald-700' : 'text-snow-600'
        }`}>{sys.label}</p>
        {sys.sublabel && (
          <p className={`${isExpanded ? 'text-[8px]' : 'text-[7px]'} text-snow-400 leading-tight`}>{sys.sublabel}</p>
        )}
      </div>
    </motion.div>
  );
}

function HorizontalConnector({ status }: { status: SystemStatus }) {
  return (
    <div className={`w-4 h-[2px] rounded-full transition-colors duration-500 ${connectorColor(status)}`}>
      {(status === 'active' || status === 'connecting') && (
        <motion.div
          className="h-full w-full rounded-full bg-volvo-blue"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}
    </div>
  );
}


export function SystemLinks({ statuses, isRunning, isExpanded }: Props) {
  const workatoStatus = statuses.workato;
  const aiStatus = statuses.ai_agent;
  const workatoActive = workatoStatus === 'active' || workatoStatus === 'connecting';
  const workatoComplete = workatoStatus === 'complete';
  const anyActive = isRunning || Object.values(statuses).some((s) => s !== 'idle');

  return (
    <div className="px-3 py-2.5">
      {anyActive && (
        <div className="flex items-center justify-end gap-1.5 mb-2.5 px-0.5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-1"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-volvo-blue animate-fade-pulse" />
            <span className="text-[9px] text-volvo-blue font-mono font-medium">LIVE</span>
          </motion.div>
        </div>
      )}

      <div className="mb-2.5 flex justify-center gap-2">
        <ClaudeNode status={aiStatus} isExpanded={isExpanded} />
        <GeminiNode status={aiStatus} isExpanded={isExpanded} />
      </div>

      <div className="flex justify-center mb-2">
        <div className={`w-[2px] ${isExpanded ? 'h-6' : 'h-4'} rounded-full transition-all duration-500 ${connectorColor(aiStatus !== 'idle' ? aiStatus : workatoStatus)}`} />
      </div>

      <div className="flex items-stretch justify-center gap-0">
        <div className="flex flex-col gap-1.5 items-end">
          {leftSystems.map((sys) => (
            <div key={sys.key} className="flex items-center">
              <SystemNode sys={sys} status={statuses[sys.key]} isExpanded={isExpanded} />
              <HorizontalConnector status={statuses[sys.key]} />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center relative">
          <motion.div
            className={`${isExpanded ? 'w-16' : 'w-12'} rounded-xl border-2 flex flex-col items-center justify-center py-3 px-1 transition-all duration-300 ${
              workatoActive
                ? 'border-orange-300 bg-gradient-to-b from-orange-50 to-amber-50 shadow-md'
                : workatoComplete
                  ? 'border-emerald-300 bg-gradient-to-b from-emerald-50 to-teal-50'
                  : 'border-snow-200 bg-snow-50'
            }`}
            animate={workatoActive ? { boxShadow: ['0 0 0px rgba(234,88,12,0)', '0 0 12px rgba(234,88,12,0.15)', '0 0 0px rgba(234,88,12,0)'] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ minHeight: `${Math.max(leftSystems.length, rightSystems.length) * (isExpanded ? 48 : 42)}px` }}
          >
            <img
              src="/logos/workato.png"
              alt="Workato"
              className={`${isExpanded ? 'w-10 h-10' : 'w-6 h-6'} object-cover rounded-full transition-all duration-300 ${!workatoActive && !workatoComplete ? 'opacity-40' : 'opacity-100'}`}
            />
            <p className={`${isExpanded ? 'text-[9px]' : 'text-[8px]'} font-bold mt-1 transition-all duration-300 ${
              workatoActive ? 'text-orange-600' : workatoComplete ? 'text-emerald-700' : 'text-snow-400'
            }`}>Workato</p>
            {workatoActive && (
              <motion.div
                className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-white"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>

        <div className="flex flex-col gap-1.5 items-start">
          {rightSystems.map((sys) => (
            <div key={sys.key} className="flex items-center">
              <HorizontalConnector status={statuses[sys.key]} />
              <SystemNode sys={sys} status={statuses[sys.key]} isExpanded={isExpanded} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
