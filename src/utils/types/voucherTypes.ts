export interface IVoucherNumberPayload {
  type:
    | "Contra"
    | "Payment"
    | "Receipt"
    | "Journal"
    | "Debit Note"
    | "Credit Note"
    | "Purchase"
    | "Sales"
    | "Memo"
    | "Order"
    | "Delivery Note"
    | "Receipt Note"
    | "Rejection Note"
    | "Payroll"
    | "Manufacture"
    | "Consumption"
    | "Purchase Order"
    | "Sales Order"
    | "Stock Journal"
    | "Debit Note"
    | "Credit Note"
    | "Reversing Journal";
  voucherNumber?: number;
}

export interface IPurchaseVoucher {
  voucherNumber: string;
  invoiceNumber: string;
  voucherDate: string;
  voucherType: "Purchase";
  payeeOrPayer: string;
  amount: number;
  totalGST: number;
  cgst: number;
  sgst: number;
  paymentMethod: string;
  items: Array<{
    itemName: string;
    quantity: number;
    rate: number;
    gst: number;
    amount: number;
    batch: string;
    expiryDate: string;
  }>;
  ledgerEntries: Array<{
    ledger: string;
    amount: number;
    drOrCr: "D" | "C";
  }>;
  description: string;
}
