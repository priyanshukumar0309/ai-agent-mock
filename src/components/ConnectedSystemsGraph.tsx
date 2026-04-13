import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { SystemStatuses, SystemStatus, SystemName } from '../data/types';

interface Props {
  statuses: SystemStatuses;
  isRunning: boolean;
}

interface NodeDef {
  key: SystemName;
  label: string;
  sublabel?: string;
  logo: string | null;
  x: number;
  y: number;
}

const HUB_X = 200;
const HUB_Y = 175;

const AI_NODES: NodeDef[] = [
  { key: 'ai_agent', label: 'Claude', sublabel: 'Anthropic', logo: '/logos/claude.png', x: 140, y: 32 },
  { key: 'ai_agent', label: 'Gemini', sublabel: 'Google', logo: '/logos/gemini.png', x: 260, y: 32 },
];

const LEFT_NODES: NodeDef[] = [
  { key: 'servicenow', label: 'ServiceNow', logo: '/logos/servicenow.png', x: 42, y: 115 },
  { key: 'sap', label: 'SAP ECC', logo: '/logos/SAP12.png', x: 42, y: 175 },
  { key: 'sap_p60', label: 'S4 P60', sublabel: 'GB11', logo: '/logos/SAP12.png', x: 42, y: 235 },
  { key: 'sap_p72', label: 'S4 P72', sublabel: 'SK02', logo: '/logos/SAP12.png', x: 42, y: 295 },
  { key: 'medius', label: 'Medius', logo: null, x: 42, y: 340 },
];

const RIGHT_NODES: NodeDef[] = [
  { key: 'outlook', label: 'Outlook', logo: '/logos/outlook.png', x: 358, y: 120 },
  { key: 'teams', label: 'Teams', logo: '/logos/teams.png', x: 358, y: 195 },
  { key: 'sharepoint', label: 'SharePoint', logo: '/logos/sharepoint.png', x: 358, y: 270 },
];

function getStatusColor(status: SystemStatus) {
  switch (status) {
    case 'idle': return '#d1d5db';
    case 'connecting': return '#f59e0b';
    case 'active': return '#1B76B9';
    case 'complete': return '#10b981';
  }
}

function getGlowColor(status: SystemStatus) {
  switch (status) {
    case 'idle': return 'rgba(209,213,219,0)';
    case 'connecting': return 'rgba(245,158,11,0.4)';
    case 'active': return 'rgba(27,118,185,0.5)';
    case 'complete': return 'rgba(16,185,129,0.3)';
  }
}

function ConnectionLine({ x1, y1, x2, y2, status, id }: {
  x1: number; y1: number; x2: number; y2: number;
  status: SystemStatus; id: string;
}) {
  const color = getStatusColor(status);
  const isAnimating = status === 'active' || status === 'connecting';

  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={isAnimating ? 2 : 1}
        strokeOpacity={status === 'idle' ? 0.3 : 0.7}
        strokeLinecap="round"
      />
      {isAnimating && (
        <>
          <line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={color}
            strokeWidth={3}
            strokeOpacity={0.15}
            strokeLinecap="round"
          />
          <circle r="3" fill={color}>
            <animateMotion
              dur="1.5s"
              repeatCount="indefinite"
              path={`M${x1},${y1} L${x2},${y2}`}
              key={`motion-${id}`}
            />
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="2" fill="white" opacity="0.8">
            <animateMotion
              dur="1.5s"
              repeatCount="indefinite"
              path={`M${x1},${y1} L${x2},${y2}`}
              key={`motion-inner-${id}`}
            />
          </circle>
        </>
      )}
    </g>
  );
}

function NodeIcon({ node, status }: { node: NodeDef; status: SystemStatus }) {
  const isActive = status === 'active' || status === 'connecting';
  const isComplete = status === 'complete';
  const color = getStatusColor(status);
  const glow = getGlowColor(status);
  const r = 18;

  return (
    <g>
      {isActive && (
        <circle cx={node.x} cy={node.y} r={r + 6} fill="none" stroke={color} strokeWidth={1} opacity={0.3}>
          <animate
            attributeName="r"
            values={`${r + 2};${r + 8};${r + 2}`}
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4;0.1;0.4"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      <circle
        cx={node.x}
        cy={node.y}
        r={r}
        fill={isActive ? '#f0f7ff' : isComplete ? '#ecfdf5' : '#fafbfc'}
        stroke={color}
        strokeWidth={isActive ? 2 : 1.5}
        style={{ filter: isActive ? `drop-shadow(0 0 6px ${glow})` : 'none' }}
      />

      {isComplete ? (
        <foreignObject x={node.x - 8} y={node.y - 8} width={16} height={16}>
          <div className="w-4 h-4 flex items-center justify-center">
            <Check size={12} className="text-emerald-600" />
          </div>
        </foreignObject>
      ) : node.logo ? (
        <image
          href={node.logo}
          x={node.x - 10}
          y={node.y - 10}
          width={20}
          height={20}
          opacity={isActive || isComplete ? 1 : 0.4}
          style={{ transition: 'opacity 0.3s' }}
        />
      ) : (
        <text
          x={node.x}
          y={node.y + 4}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          fill={isActive ? color : isComplete ? '#059669' : '#9aa1ad'}
        >
          {node.label.charAt(0)}
        </text>
      )}

      <text
        x={node.x}
        y={node.y + r + 12}
        textAnchor="middle"
        fontSize={8}
        fontWeight={600}
        fill={isActive ? color : isComplete ? '#059669' : '#6b7280'}
        style={{ transition: 'fill 0.3s' }}
      >
        {node.label}
      </text>
      {node.sublabel && (
        <text
          x={node.x}
          y={node.y + r + 21}
          textAnchor="middle"
          fontSize={7}
          fill="#9aa1ad"
        >
          {node.sublabel}
        </text>
      )}
    </g>
  );
}

function HubNode({ status }: { status: SystemStatus }) {
  const isActive = status === 'active' || status === 'connecting';
  const isComplete = status === 'complete';
  const r = 26;
  const color = isActive ? '#ea580c' : isComplete ? '#10b981' : '#d1d5db';

  return (
    <g>
      {isActive && (
        <>
          <circle cx={HUB_X} cy={HUB_Y} r={r + 10} fill="none" stroke="#ea580c" strokeWidth={1} opacity={0.2}>
            <animate
              attributeName="r"
              values={`${r + 4};${r + 14};${r + 4}`}
              dur="2.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.05;0.3"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={HUB_X} cy={HUB_Y} r={r + 4} fill="none" stroke="#ea580c" strokeWidth={1.5} opacity={0.15}>
            <animate
              attributeName="opacity"
              values="0.2;0.05;0.2"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </>
      )}

      <circle
        cx={HUB_X}
        cy={HUB_Y}
        r={r}
        fill={isActive ? '#fff7ed' : isComplete ? '#ecfdf5' : '#fafbfc'}
        stroke={color}
        strokeWidth={isActive ? 2.5 : 1.5}
        style={{
          filter: isActive ? 'drop-shadow(0 0 10px rgba(234,88,12,0.25))' : 'none',
          transition: 'all 0.3s',
        }}
      />

      {isComplete ? (
        <foreignObject x={HUB_X - 10} y={HUB_Y - 10} width={20} height={20}>
          <div className="w-5 h-5 flex items-center justify-center">
            <Check size={16} className="text-emerald-600" />
          </div>
        </foreignObject>
      ) : (
        <image
          href="/logos/workato.png"
          x={HUB_X - 14}
          y={HUB_Y - 14}
          width={28}
          height={28}
          opacity={isActive || isComplete ? 1 : 0.4}
          style={{ transition: 'opacity 0.3s', clipPath: 'circle(14px at 14px 14px)' }}
        />
      )}

      <text
        x={HUB_X}
        y={HUB_Y + r + 14}
        textAnchor="middle"
        fontSize={9}
        fontWeight={700}
        fill={isActive ? '#ea580c' : isComplete ? '#059669' : '#9aa1ad'}
        style={{ transition: 'fill 0.3s' }}
      >
        Workato
      </text>
    </g>
  );
}

export function ConnectedSystemsGraph({ statuses, isRunning }: Props) {
  const workatoStatus = statuses.workato;
  const aiStatus = statuses.ai_agent;
  const anyActive = isRunning || Object.values(statuses).some((s) => s !== 'idle');

  return (
    <div className="relative w-full h-full min-h-[280px]">
      {anyActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-2 right-3 flex items-center gap-1.5 z-10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-volvo-blue animate-fade-pulse" />
          <span className="text-[9px] text-volvo-blue font-mono font-medium">LIVE</span>
        </motion.div>
      )}

      <svg
        viewBox="0 0 400 370"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {AI_NODES.map((node) => (
          <ConnectionLine
            key={`ai-hub-${node.label}`}
            x1={node.x}
            y1={node.y + 22}
            x2={HUB_X}
            y2={HUB_Y - 28}
            status={aiStatus}
            id={`ai-${node.label}`}
          />
        ))}

        {LEFT_NODES.map((node) => (
          <ConnectionLine
            key={`left-hub-${node.key}`}
            x1={node.x + 22}
            y1={node.y}
            x2={HUB_X - 28}
            y2={HUB_Y}
            status={statuses[node.key]}
            id={`left-${node.key}`}
          />
        ))}

        {RIGHT_NODES.map((node) => (
          <ConnectionLine
            key={`right-hub-${node.key}`}
            x1={node.x - 22}
            y1={node.y}
            x2={HUB_X + 28}
            y2={HUB_Y}
            status={statuses[node.key]}
            id={`right-${node.key}`}
          />
        ))}

        <HubNode status={workatoStatus} />

        {AI_NODES.map((node, i) => (
          <NodeIcon key={`ai-${i}`} node={node} status={aiStatus} />
        ))}
        {LEFT_NODES.map((node) => (
          <NodeIcon key={node.key} node={node} status={statuses[node.key]} />
        ))}
        {RIGHT_NODES.map((node) => (
          <NodeIcon key={node.key} node={node} status={statuses[node.key]} />
        ))}
      </svg>
    </div>
  );
}
