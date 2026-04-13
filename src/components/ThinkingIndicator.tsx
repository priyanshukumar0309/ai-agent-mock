import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="flex items-start gap-3 px-6 py-2"
    >
      <div className="w-8 h-8 rounded-full bg-volvo-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot size={14} className="text-volvo-navy" />
      </div>
      <div className="bg-snow-100 border border-snow-200 rounded-2xl rounded-tl-sm px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-snow-500 mr-1">Analyzing</span>
          <div className="w-1.5 h-1.5 rounded-full bg-volvo-blue animate-dot-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-volvo-blue animate-dot-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-volvo-blue animate-dot-3" />
        </div>
      </div>
    </motion.div>
  );
}
