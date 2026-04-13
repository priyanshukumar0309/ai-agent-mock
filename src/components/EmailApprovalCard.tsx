import { motion } from 'framer-motion';
import { Check, Paperclip, Clock, Warehouse } from 'lucide-react';
import type { EmailCardType } from '../data/types';

interface Props {
  type: EmailCardType;
}

function SentEmail() {
  return (
    <div className="mt-3 rounded-lg border border-sky-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 bg-sky-50 border-b border-sky-100">
        <img src="/outlook.png" alt="Outlook" className="w-4 h-4" />
        <span className="text-[10px] font-semibold text-sky-700 uppercase tracking-wider">Outlook -- Email Sent</span>
        <Clock size={10} className="ml-auto text-sky-400" />
        <span className="text-[9px] text-sky-400">Just now</span>
      </div>
      <div className="px-3 py-2.5 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">From:</span>
            <span className="text-[10px] text-snow-700 font-medium">AP Agent &lt;ap-agent@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">To:</span>
            <span className="text-[10px] text-snow-700 font-medium">Henrik Larsson &lt;henrik.larsson@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">Cc:</span>
            <span className="text-[10px] text-snow-700">fo-approvals@volvocars.com</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">Subj:</span>
            <span className="text-[10px] text-snow-800 font-semibold">[URGENT] Approval Required -- Invoice 91SISAAC4182 (ZAR 21,279.92) -- Rola Volvo Cars Somerset West</span>
          </div>
        </div>
        <div className="border-t border-snow-100 pt-2">
          <p className="text-[10px] text-snow-600 leading-relaxed">
            Dear Henrik,
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            Invoice 91SISAAC4182 for ZAR 21,279.92 from Rola Volvo Cars Somerset West (Parma ID: 389278)
            has been pending FO approval since February 2025 and has been escalated 4 times without resolution.
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            The dealer is requesting an update on payment timing. Please review and approve at your earliest convenience
            so we can proceed with payment processing.
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            Full aging report is attached for reference.
          </p>
          <p className="text-[10px] text-snow-500 mt-2">
            Regards,<br />
            AP Automation Agent<br />
            <span className="text-[9px] text-snow-400">Volvo Financial Operations</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 pt-1 border-t border-snow-100">
          <Paperclip size={9} className="text-snow-400" />
          <span className="text-[9px] text-sky-600 underline">AgingReport_389278_Mar2025.pdf</span>
        </div>
      </div>
    </div>
  );
}

function ApprovalEmail() {
  return (
    <div className="mt-3 rounded-lg border border-emerald-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border-b border-emerald-100">
        <img src="/outlook.png" alt="Outlook" className="w-4 h-4" />
        <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Outlook -- Approval Received</span>
        <Check size={10} className="ml-auto text-emerald-500" />
        <span className="text-[9px] text-emerald-500">Just now</span>
      </div>
      <div className="px-3 py-2.5 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">From:</span>
            <span className="text-[10px] text-snow-700 font-medium">Henrik Larsson &lt;henrik.larsson@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">To:</span>
            <span className="text-[10px] text-snow-700">AP Agent &lt;ap-agent@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">Subj:</span>
            <span className="text-[10px] text-snow-800 font-semibold">Re: [URGENT] Approval Required -- Invoice 91SISAAC4182 (ZAR 21,279.92)</span>
          </div>
        </div>
        <div className="border-t border-snow-100 pt-2">
          <p className="text-[10px] text-snow-600 leading-relaxed">
            Hi,
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            Approved. Please proceed with the payment release for invoice 91SISAAC4182.
            Apologies for the delay on this one.
          </p>
          <div className="mt-2 pt-1.5 border-t border-snow-100">
            <p className="text-[10px] text-snow-700 font-medium">Henrik Larsson</p>
            <p className="text-[9px] text-snow-400">Senior Manager, Financial Operations</p>
            <p className="text-[9px] text-snow-400">Volvo Car Corporation -- EMEA Region</p>
            <p className="text-[9px] text-snow-400">Tel: +46 31 325 4400</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-snow-100">
          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded border border-emerald-200">
            <Check size={9} className="text-emerald-600" />
            <span className="text-[9px] font-semibold text-emerald-700">APPROVED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WarehouseSentEmail() {
  return (
    <div className="mt-3 rounded-lg border border-amber-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border-b border-amber-100">
        <img src="/outlook.png" alt="Outlook" className="w-4 h-4" />
        <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider">Outlook -- GR Expedite Request Sent</span>
        <Clock size={10} className="ml-auto text-amber-400" />
        <span className="text-[9px] text-amber-400">Just now</span>
      </div>
      <div className="px-3 py-2.5 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">From:</span>
            <span className="text-[10px] text-snow-700 font-medium">AP Agent &lt;ap-agent@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">To:</span>
            <span className="text-[10px] text-snow-700 font-medium">Maria Andersson &lt;maria.andersson@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">Cc:</span>
            <span className="text-[10px] text-snow-700">warehouse-ops@volvocars.com</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">Subj:</span>
            <span className="text-[10px] text-snow-800 font-semibold">[ACTION] GR Posting Required -- DN-9981204 (100 units) -- Invoice SE7200891 Blocked</span>
          </div>
        </div>
        <div className="border-t border-snow-100 pt-2">
          <p className="text-[10px] text-snow-600 leading-relaxed">
            Dear Maria,
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            Invoice SE7200891 from Lindstrom Logistics has a partial payment block (code "R") due to a GR/IR quantity mismatch.
            100 units on delivery note DN-9981204 have not yet been confirmed as received.
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            The supplier invoiced EUR 5,000 but only EUR 2,000 was released (400 of 500 units).
            The remaining EUR 3,000 is blocked until the Goods Receipt is posted for the outstanding 100 units.
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            Could you please expedite the GR posting for DN-9981204 so the payment block can be released?
          </p>
          <p className="text-[10px] text-snow-500 mt-2">
            Regards,<br />
            AP Automation Agent<br />
            <span className="text-[9px] text-snow-400">Volvo Financial Operations</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 pt-1 border-t border-snow-100">
          <Paperclip size={9} className="text-snow-400" />
          <span className="text-[9px] text-amber-600 underline">GR_IR_Mismatch_SE7200891.pdf</span>
        </div>
      </div>
    </div>
  );
}

function WarehouseConfirmedEmail() {
  return (
    <div className="mt-3 rounded-lg border border-emerald-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border-b border-emerald-100">
        <img src="/outlook.png" alt="Outlook" className="w-4 h-4" />
        <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Outlook -- GR Confirmation Received</span>
        <Warehouse size={10} className="ml-auto text-emerald-500" />
        <span className="text-[9px] text-emerald-500">Just now</span>
      </div>
      <div className="px-3 py-2.5 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">From:</span>
            <span className="text-[10px] text-snow-700 font-medium">Maria Andersson &lt;maria.andersson@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">To:</span>
            <span className="text-[10px] text-snow-700">AP Agent &lt;ap-agent@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">Subj:</span>
            <span className="text-[10px] text-snow-800 font-semibold">Re: [ACTION] GR Posting Required -- DN-9981204 (100 units)</span>
          </div>
        </div>
        <div className="border-t border-snow-100 pt-2">
          <p className="text-[10px] text-snow-600 leading-relaxed">
            Hi,
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            GR has been posted for DN-9981204 (100 units). The goods were received on 12 March but
            the confirmation was delayed due to a system backlog. All sorted now.
          </p>
          <div className="mt-2 pt-1.5 border-t border-snow-100">
            <p className="text-[10px] text-snow-700 font-medium">Maria Andersson</p>
            <p className="text-[9px] text-snow-400">Warehouse SPOC, Logistics Operations</p>
            <p className="text-[9px] text-snow-400">Volvo Car Corporation -- Torslanda Plant</p>
            <p className="text-[9px] text-snow-400">Tel: +46 31 325 7200</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-snow-100">
          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded border border-emerald-200">
            <Check size={9} className="text-emerald-600" />
            <span className="text-[9px] font-semibold text-emerald-700">GR POSTED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChineseSentEmail() {
  return (
    <div className="mt-3 rounded-lg border border-sky-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 bg-sky-50 border-b border-sky-100">
        <img src="/outlook.png" alt="Outlook" className="w-4 h-4" />
        <span className="text-[10px] font-semibold text-sky-700 uppercase tracking-wider">Outlook -- 邮件已发送</span>
        <Clock size={10} className="ml-auto text-sky-400" />
        <span className="text-[9px] text-sky-400">刚刚</span>
      </div>
      <div className="px-3 py-2.5 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">发件人:</span>
            <span className="text-[10px] text-snow-700 font-medium">AP 自动化代理 &lt;ap-agent@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">收件人:</span>
            <span className="text-[10px] text-snow-700 font-medium">张伟 &lt;wei.zhang@volvocars.com.cn&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">抄送:</span>
            <span className="text-[10px] text-snow-700">apac-finance@volvocars.com</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">主题:</span>
            <span className="text-[10px] text-snow-800 font-semibold">[紧急] 收货确认请求 -- 交货单 DN-CHN-20241210 -- 博世汽车部件(苏州)有限公司</span>
          </div>
        </div>
        <div className="border-t border-snow-100 pt-2">
          <p className="text-[10px] text-snow-600 leading-relaxed">
            张伟 您好，
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            供应商博世汽车部件(苏州)有限公司（供应商编号：AEFFQ）提交的交货单 DN-CHN-20241210
            涉及4笔交货记录，共计192件物料，但SAP系统中尚未确认收货。
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            供应商已提供了沃尔沃签章的收货确认书(POD)作为交货凭证。请核实并尽快在系统中完成收货确认，
            以便释放相关付款。
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            随附收货确认书及交货明细供参考。
          </p>
          <p className="text-[10px] text-snow-500 mt-2">
            此致，<br />
            AP 自动化代理<br />
            <span className="text-[9px] text-snow-400">沃尔沃汽车财务运营部</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 pt-1 border-t border-snow-100">
          <Paperclip size={9} className="text-snow-400" />
          <span className="text-[9px] text-sky-600 underline">POD_DN-CHN-20241210_博世.pdf</span>
        </div>
      </div>
    </div>
  );
}

function ChineseApprovalEmail() {
  return (
    <div className="mt-3 rounded-lg border border-emerald-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border-b border-emerald-100">
        <img src="/outlook.png" alt="Outlook" className="w-4 h-4" />
        <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Outlook -- 已确认收货</span>
        <Check size={10} className="ml-auto text-emerald-500" />
        <span className="text-[9px] text-emerald-500">刚刚</span>
      </div>
      <div className="px-3 py-2.5 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">发件人:</span>
            <span className="text-[10px] text-snow-700 font-medium">张伟 &lt;wei.zhang@volvocars.com.cn&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">收件人:</span>
            <span className="text-[10px] text-snow-700">AP 自动化代理 &lt;ap-agent@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">主题:</span>
            <span className="text-[10px] text-snow-800 font-semibold">回复: [紧急] 收货确认请求 -- 交货单 DN-CHN-20241210</span>
          </div>
        </div>
        <div className="border-t border-snow-100 pt-2">
          <p className="text-[10px] text-snow-600 leading-relaxed">
            您好，
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            已核实确认。交货单 DN-CHN-20241210 的所有4笔交货记录（共192件）均已在SAP系统中完成收货确认。
            此前延迟是由于年末系统切换导致。请继续处理付款。
          </p>
          <div className="mt-2 pt-1.5 border-t border-snow-100">
            <p className="text-[10px] text-snow-700 font-medium">张伟</p>
            <p className="text-[9px] text-snow-400">仓储运营主管</p>
            <p className="text-[9px] text-snow-400">沃尔沃汽车（成都）有限公司</p>
            <p className="text-[9px] text-snow-400">电话: +86 28 8532 6000</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-snow-100">
          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded border border-emerald-200">
            <Check size={9} className="text-emerald-600" />
            <span className="text-[9px] font-semibold text-emerald-700">已确认收货</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceScanningSentEmail() {
  return (
    <div className="mt-3 rounded-lg border border-sky-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 bg-sky-50 border-b border-sky-100">
        <img src="/outlook.png" alt="Outlook" className="w-4 h-4" />
        <span className="text-[10px] font-semibold text-sky-700 uppercase tracking-wider">Outlook -- Invoice Forwarded to Scanning</span>
        <Clock size={10} className="ml-auto text-sky-400" />
        <span className="text-[9px] text-sky-400">Just now</span>
      </div>
      <div className="px-3 py-2.5 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">From:</span>
            <span className="text-[10px] text-snow-700 font-medium">AP Agent &lt;ap-agent@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">To:</span>
            <span className="text-[10px] text-snow-700 font-medium">invoice.VolvoCarUSOperationsInc.US02@ap.volvocars.biz</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">Cc:</span>
            <span className="text-[10px] text-snow-700">carlos.juarez@joysonquin.com</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">Subj:</span>
            <span className="text-[10px] text-snow-800 font-semibold">Invoice Scan Request -- 99086498 T106284 (USD 124,930.20) -- JoysonQuin / Vendor AERYJ</span>
          </div>
        </div>
        <div className="border-t border-snow-100 pt-2">
          <p className="text-[10px] text-snow-600 leading-relaxed">
            Dear Scanning Team,
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            Please process the attached invoice from JoysonQuin Automotive Systems (Vendor: AERYJ)
            for Volvo Car USA LLC. Invoice 99086498, Tool Order T106284, total USD 124,930.20 (11 line items).
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            Payment terms: 60 days due net. Delivery terms: FCA - Free Carrier San Luis Potosi, Mexico.
          </p>
          <p className="text-[10px] text-snow-500 mt-2">
            Regards,<br />
            AP Automation Agent<br />
            <span className="text-[9px] text-snow-400">Volvo Financial Operations</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5 pt-1 border-t border-snow-100">
          <Paperclip size={9} className="text-snow-400" />
          <span className="text-[9px] text-sky-600 underline">99086498_T106284.pdf</span>
        </div>
      </div>
    </div>
  );
}

function InvoiceScanningConfirmedEmail() {
  return (
    <div className="mt-3 rounded-lg border border-emerald-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border-b border-emerald-100">
        <img src="/outlook.png" alt="Outlook" className="w-4 h-4" />
        <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Outlook -- Supplier Confirmation Sent</span>
        <Check size={10} className="ml-auto text-emerald-500" />
        <span className="text-[9px] text-emerald-500">Just now</span>
      </div>
      <div className="px-3 py-2.5 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">From:</span>
            <span className="text-[10px] text-snow-700 font-medium">AP Agent &lt;ap-agent@volvocars.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">To:</span>
            <span className="text-[10px] text-snow-700 font-medium">Carlos Juarez &lt;carlos.juarez@joysonquin.com&gt;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-snow-400 w-8 shrink-0">Subj:</span>
            <span className="text-[10px] text-snow-800 font-semibold">Confirmation -- Invoice 99086498 T106284 Registered (Payment Due 25.03.2025)</span>
          </div>
        </div>
        <div className="border-t border-snow-100 pt-2">
          <p className="text-[10px] text-snow-600 leading-relaxed">
            Dear Carlos,
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            Your invoice 99086498 (Tool Order T106284) for USD 124,930.20 has been successfully registered
            in our system and is scheduled for payment on 25.03.2025 per the 60-day net terms.
          </p>
          <p className="text-[10px] text-snow-600 leading-relaxed mt-1.5">
            For future invoices, please send directly to:<br />
            <span className="font-medium">invoice.VolvoCarUSOperationsInc.US02@ap.volvocars.biz</span><br />
            (one invoice per PDF, max 10MB per email).
          </p>
          <p className="text-[10px] text-snow-500 mt-2">
            Regards,<br />
            AP Automation Agent<br />
            <span className="text-[9px] text-snow-400">Volvo Financial Operations</span>
          </p>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-snow-100">
          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded border border-emerald-200">
            <Check size={9} className="text-emerald-600" />
            <span className="text-[9px] font-semibold text-emerald-700">REGISTERED &amp; SCHEDULED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const emailComponents: Record<EmailCardType, () => JSX.Element> = {
  'sent': SentEmail,
  'approval': ApprovalEmail,
  'warehouse-sent': WarehouseSentEmail,
  'warehouse-confirmed': WarehouseConfirmedEmail,
  'cn-sent': ChineseSentEmail,
  'cn-approval': ChineseApprovalEmail,
  'invoice-scanning-sent': InvoiceScanningSentEmail,
  'invoice-scanning-confirmed': InvoiceScanningConfirmedEmail,
};

export function EmailApprovalCard({ type }: Props) {
  const Component = emailComponents[type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Component />
    </motion.div>
  );
}
