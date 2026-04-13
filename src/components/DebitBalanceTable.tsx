import { motion } from 'framer-motion';
import { fbl1nData, balanceSummary } from '../data/tableData';

export function DebitBalanceTable() {
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
            SAP FBL1N -- Vendor Open Items
          </span>
          <span className="text-[10px] text-snow-500 font-mono">SEPV/805</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-snow-200 bg-snow-50/50">
                <th className="px-3 py-2 text-left text-snow-600 font-medium">Doc No.</th>
                <th className="px-3 py-2 text-left text-snow-600 font-medium">Type</th>
                <th className="px-3 py-2 text-right text-snow-600 font-medium">Amount</th>
                <th className="px-3 py-2 text-center text-snow-600 font-medium">Curr.</th>
                <th className="px-3 py-2 text-left text-snow-600 font-medium">Due Date</th>
                <th className="px-3 py-2 text-left text-snow-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {fbl1nData.map((row, i) => (
                <motion.tr
                  key={row.docNumber}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.3 }}
                  className={`border-b border-snow-100 ${i % 2 === 0 ? 'bg-white' : 'bg-snow-50/30'}`}
                >
                  <td className="px-3 py-2 font-mono text-snow-700">{row.docNumber}</td>
                  <td className="px-3 py-2 text-snow-600">{row.docType}</td>
                  <td className={`px-3 py-2 text-right font-mono font-medium ${
                    row.amount.startsWith('-') ? 'text-volvo-red' : 'text-volvo-green'
                  }`}>{row.amount}</td>
                  <td className="px-3 py-2 text-center text-snow-500">{row.currency}</td>
                  <td className="px-3 py-2 font-mono text-snow-600">{row.dueDate}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                      row.status === 'Open'
                        ? 'bg-amber-50 text-volvo-amber border border-amber-200'
                        : 'bg-emerald-50 text-volvo-green border border-emerald-200'
                    }`}>{row.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-snow-200 bg-snow-50 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-snow-500">
              Debit: <span className="text-volvo-green font-mono font-medium">{balanceSummary.totalDebit}</span>
            </span>
            <span className="text-snow-500">
              Credit: <span className="text-volvo-red font-mono font-medium">{balanceSummary.totalCredit}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-snow-500">Net:</span>
            <span className="text-xs font-semibold font-mono text-volvo-amber">{balanceSummary.netBalance} EUR</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-volvo-red border border-red-200">
              {balanceSummary.balanceType}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
