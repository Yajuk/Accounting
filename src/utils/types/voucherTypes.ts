interface IVoucherNumberPayload {
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
