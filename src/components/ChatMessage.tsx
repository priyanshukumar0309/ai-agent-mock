import { motion } from 'framer-motion';
import { Bot, User, FileText } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../data/types';
import { DebitBalanceTable } from './DebitBalanceTable';
import { InvoiceStatusTable } from './InvoiceStatusTable';
import { EmailApprovalCard } from './EmailApprovalCard';

interface Props {
  message: ChatMessageType;
  onConfirm?: () => void;
  confirmationSent?: boolean;
}

export function ChatMessage({ message, onConfirm, confirmationSent }: Props) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex items-start gap-3 px-6 py-2 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isUser
            ? 'bg-volvo-blue text-white'
            : 'bg-volvo-navy/10 text-volvo-navy'
        }`}
      >
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>
      <div
        className={`max-w-[85%] ${
          isUser
            ? 'bg-volvo-blue text-white rounded-2xl rounded-tr-sm'
            : 'bg-snow-100 border border-snow-200 text-snow-800 rounded-2xl rounded-tl-sm'
        } px-5 py-3.5`}
      >
        <p className={`text-sm leading-relaxed ${isUser ? 'text-white' : 'text-snow-700'}`}>
          {message.content}
        </p>

        {message.attachment && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3"
          >
            <a
              href={message.attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                isUser
                  ? 'bg-white/10 border-white/20 hover:bg-white/20'
                  : 'bg-white border-snow-200 hover:border-snow-300'
              }`}
            >
              <FileText size={16} className={isUser ? 'text-white' : 'text-volvo-blue'} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium truncate ${isUser ? 'text-white' : 'text-snow-700'}`}>
                  {message.attachment.name}
                </p>
                <p className={`text-[10px] ${isUser ? 'text-white/70' : 'text-snow-400'}`}>
                  PDF Document
                </p>
              </div>
            </a>
            {message.attachment.showInline && (
              <div className="mt-2 rounded-lg border border-snow-200 overflow-hidden bg-white">
                <iframe
                  src={message.attachment.url}
                  className="w-full h-96"
                  title={message.attachment.name}
                />
              </div>
            )}
          </motion.div>
        )}

        {message.showTable && (
          message.tableType === 'invoice-status'
            ? <InvoiceStatusTable />
            : <DebitBalanceTable />
        )}

        {message.showEmailCard && (
          <EmailApprovalCard type={message.showEmailCard} />
        )}

        {message.showConfirmation && !confirmationSent && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 flex items-center gap-2"
          >
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-volvo-navy hover:bg-volvo-navy-light text-white text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md"
            >
              {message.confirmLabel || 'Yes, proceed'}
            </button>
            <button className="px-4 py-2 bg-snow-200 hover:bg-snow-300 text-snow-600 text-xs font-medium rounded-lg transition-colors">
              Not now
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
