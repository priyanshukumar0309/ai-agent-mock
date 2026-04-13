import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Bot, Send } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../data/types';
import { ChatMessage } from './ChatMessage';
import { ThinkingIndicator } from './ThinkingIndicator';

interface Props {
  messages: ChatMessageType[];
  isThinking: boolean;
  onConfirm: () => void;
  confirmationSent: boolean;
}

export function ChatPane({ messages, isThinking, onConfirm, confirmationSent }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isThinking]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-6 py-3.5 border-b border-snow-200 flex items-center gap-3 bg-volvo-navy">
        <svg width="28" height="28" viewBox="0 0 32 32" className="flex-shrink-0">
          <circle cx="16" cy="16" r="14" fill="none" stroke="white" strokeWidth="1.5" />
          <line x1="6" y1="16" x2="26" y2="16" stroke="white" strokeWidth="1.5" />
          <line x1="16" y1="6" x2="26" y2="16" stroke="white" strokeWidth="1.5" />
          <line x1="16" y1="26" x2="26" y2="16" stroke="white" strokeWidth="1.5" />
        </svg>
        <div className="h-5 w-px bg-white/20" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white tracking-wide">Volvo Cars</span>
          <span className="text-white/40">/</span>
          <span className="text-sm font-medium text-white/90">Volvo Finance Assistant</span>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-md">
          <span className="text-[10px] text-amber-300 font-semibold tracking-wide">DEMO</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-1 bg-white">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 rounded-full bg-volvo-navy/5 flex items-center justify-center mb-4">
              <Bot size={28} className="text-volvo-navy/40" />
            </div>
            <p className="text-sm font-medium text-snow-700 mb-1">Volvo Finance Assistant</p>
            <p className="text-xs text-snow-400 max-w-sm leading-relaxed">
              Select a demo scenario below to see the AI agent process a real supplier query in real-time.
            </p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onConfirm={onConfirm}
              confirmationSent={confirmationSent}
            />
          ))}
          {isThinking && <ThinkingIndicator key="thinking" />}
        </AnimatePresence>
      </div>

      <div className="px-4 py-3 border-t border-snow-200 bg-snow-50">
        <div className="flex items-center gap-2 bg-white border border-snow-200 rounded-xl px-4 py-2.5 shadow-sm">
          <input
            type="text"
            placeholder="Type a message..."
            disabled
            className="flex-1 bg-transparent text-sm text-snow-700 placeholder-snow-400 outline-none disabled:cursor-not-allowed"
          />
          <button disabled className="w-8 h-8 rounded-lg bg-volvo-navy/10 flex items-center justify-center text-volvo-navy/40">
            <Send size={14} />
          </button>
        </div>
        <p className="text-center text-[10px] text-snow-400 mt-1.5">Demo mode -- responses are simulated</p>
      </div>
    </div>
  );
}
