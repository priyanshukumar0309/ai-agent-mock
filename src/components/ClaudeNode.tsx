import { motion } from 'framer-motion';
import type { SystemStatus } from '../data/types';

interface Props {
  status: SystemStatus;
  isExpanded: boolean;
}

export function ClaudeNode({ status, isExpanded }: Props) {
  const isActive = status === 'active' || status === 'connecting';
  const isComplete = status === 'complete';

  return (
    <motion.div
      layout
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-300 ${
        isActive
          ? 'border-purple-300 bg-gradient-to-r from-purple-50 to-violet-50 shadow-md'
          : isComplete
            ? 'border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50'
            : 'border-snow-200 bg-snow-50'
      }`}
    >
      <div className="flex items-center gap-1.5">
        <div className={`relative ${isExpanded ? 'w-10 h-10' : 'w-7 h-7'} rounded-lg flex items-center justify-center transition-all duration-300 ${
          isActive ? 'bg-purple-100' : isComplete ? 'bg-emerald-100' : 'bg-snow-100'
        }`}>
          <img
            src="/logos/claude.png"
            alt="Claude"
            className={`${isExpanded ? 'w-7 h-7' : 'w-5 h-5'} object-contain transition-all duration-300 ${!isActive && !isComplete ? 'opacity-40' : 'opacity-100'}`}
          />
          {isActive && (
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-purple-500 border-[1.5px] border-white"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
        <div>
          <p className={`${isExpanded ? 'text-[11px]' : 'text-[9px]'} font-semibold leading-tight transition-all duration-300 ${
            isActive ? 'text-purple-700' : isComplete ? 'text-emerald-700' : 'text-snow-600'
          }`}>Claude</p>
          <p className={`${isExpanded ? 'text-[9px]' : 'text-[7px]'} text-snow-400 leading-tight`}>Anthropic</p>
        </div>
      </div>
    </motion.div>
  );
}
