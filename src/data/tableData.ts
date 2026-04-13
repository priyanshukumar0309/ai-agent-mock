export interface FBL1NRow {
  docNumber: string;
  docType: string;
  amount: string;
  currency: string;
  dueDate: string;
  status: string;
}

export const fbl1nData: FBL1NRow[] = [
  {
    docNumber: '5100089234',
    docType: 'KR (Invoice)',
    amount: '-42,350.00',
    currency: 'EUR',
    dueDate: '30.06.2024',
    status: 'Open',
  },
  {
    docNumber: '1900034521',
    docType: 'DZ (Payment)',
    amount: '18,200.00',
    currency: 'EUR',
    dueDate: '15.05.2024',
    status: 'Cleared',
  },
  {
    docNumber: '5100089301',
    docType: 'KR (Invoice)',
    amount: '-28,750.00',
    currency: 'EUR',
    dueDate: '10.07.2024',
    status: 'Open',
  },
  {
    docNumber: '1400002198',
    docType: 'AB (Debit Memo)',
    amount: '95,600.00',
    currency: 'EUR',
    dueDate: '01.04.2024',
    status: 'Open',
  },
];

export const balanceSummary = {
  totalDebit: '113,800.00',
  totalCredit: '-71,100.00',
  netBalance: '42,700.00',
  balanceType: 'Debit',
};

export interface InvoiceStatusRow {
  invoiceNumber: string;
  type: string;
  amount: string;
  currency: string;
  status: 'Cleared' | 'Free for Payment' | 'Pending FO Approval';
  lastUpdate: string;
  notes: string;
}

export const invoiceStatusData: InvoiceStatusRow[] = [
  {
    invoiceNumber: '91AIPAAB4004',
    type: 'KR (Invoice)',
    amount: '17,470.80',
    currency: 'ZAR',
    status: 'Cleared',
    lastUpdate: '18.09.2024',
    notes: 'Payment cleared in prior cycle',
  },
  {
    invoiceNumber: '91AIPAAB4005',
    type: 'KR (Invoice)',
    amount: '17,470.80',
    currency: 'ZAR',
    status: 'Free for Payment',
    lastUpdate: '18.09.2024',
    notes: 'Processed, awaiting payment run',
  },
  {
    invoiceNumber: '91AIPAAB4012',
    type: 'KR (Invoice)',
    amount: '17,470.80',
    currency: 'ZAR',
    status: 'Free for Payment',
    lastUpdate: '19.09.2024',
    notes: 'Processed, awaiting payment run',
  },
  {
    invoiceNumber: '91SISAAC4182',
    type: 'SVI (Service Invoice)',
    amount: '21,279.92',
    currency: 'ZAR',
    status: 'Pending FO Approval',
    lastUpdate: '08.10.2024',
    notes: 'Escalated 4x since Feb 2025',
  },
  {
    invoiceNumber: '91AIPAAB4190',
    type: 'KR (Invoice)',
    amount: '17,470.80',
    currency: 'ZAR',
    status: 'Free for Payment',
    lastUpdate: '28.10.2024',
    notes: 'Processed, awaiting payment run',
  },
  {
    invoiceNumber: '91DIAAAA2620',
    type: 'INV (Invoice)',
    amount: '3,500.00',
    currency: 'ZAR',
    status: 'Free for Payment',
    lastUpdate: '06.01.2025',
    notes: 'Exchange of courtesy vehicle',
  },
];

export const invoiceStatusSummary = {
  totalInvoices: 6,
  cleared: 1,
  freeForPayment: 4,
  pendingApproval: 1,
  totalValue: '94,663.12',
  currency: 'ZAR',
};
