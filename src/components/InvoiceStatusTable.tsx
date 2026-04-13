import { motion } from 'framer-motion';
import { invoiceStatusData, invoiceStatusSummary } from '../data/tableData';

const statusStyles: Record<string, string> = {
  'Cleared': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Free for Payment': 'bg-amber-50 text-amber-700 border border-amber-200',
  'Pending FO Approval': 'bg-red-50 text-red-700 border border-red-200',
};

export function InvoiceStatusTable() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mt-3 overflow-hidden"
    >
      <div className="bg-white border border-snow-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-4 py-2.5 border-b border-snow-200 bg-snow-50 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-volvo-navy tracking-wide uppercase">
            ServiceNow FR3446746 -- Invoice Status Report
          </span>
          <span className="text-[10px] text-snow-500 font-mono">VCZA / South Africa</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-snow-200 bg-snow-50/50">
                <th className="px-3 py-2 text-left text-snow-600 font-medium">Invoice No.</th>
                <th className="px-3 py-2 text-left text-snow-600 font-medium">Type</th>
                <th className="px-3 py-2 text-right text-snow-600 font-medium">Amount</th>
                <th className="px-3 py-2 text-center text-snow-600 font-medium">Curr.</th>
                <th className="px-3 py-2 text-left text-snow-600 font-medium">Status</th>
                <th className="px-3 py-2 text-left text-snow-600 font-medium">Last Updated</th>
                <th className="px-3 py-2 text-left text-snow-600 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {invoiceStatusData.map((row, i) => (
                <motion.tr
                  key={row.invoiceNumber}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.3 }}
                  className={`border-b border-snow-100 ${i % 2 === 0 ? 'bg-white' : 'bg-snow-50/30'}`}
                >
                  <td className="px-3 py-2 font-mono text-snow-700">{row.invoiceNumber}</td>
                  <td className="px-3 py-2 text-snow-600">{row.type}</td>
                  <td className="px-3 py-2 text-right font-mono font-medium text-snow-700">
                    {row.amount}
                  </td>
                  <td className="px-3 py-2 text-center text-snow-500">{row.currency}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap ${
                      statusStyles[row.status] || ''
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-mono text-snow-600">{row.lastUpdate}</td>
                  <td className="px-3 py-2 text-snow-500 text-[11px]">{row.notes}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-snow-200 bg-snow-50 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-snow-500">Cleared: <span className="font-medium text-emerald-700">{invoiceStatusSummary.cleared}</span></span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-snow-500">Free for Payment: <span className="font-medium text-amber-700">{invoiceStatusSummary.freeForPayment}</span></span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-snow-500">Pending: <span className="font-medium text-red-700">{invoiceStatusSummary.pendingApproval}</span></span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-snow-500">Total:</span>
            <span className="text-xs font-semibold font-mono text-volvo-navy">
              {invoiceStatusSummary.totalValue} {invoiceStatusSummary.currency}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
