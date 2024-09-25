import { nextVoucherNumber } from "@/services/product/voucherService";

type VoucherType =
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
  | "Reversing Journal";

const useVoucher = () => {
  const getNextVoucherNumber = async ({ type }: { type: VoucherType }) => {
    try {
      const response = await nextVoucherNumber({ type });
      if (response.success) {
        const voucherNumber = response.data.nextVoucherNumber;
        return voucherNumber;
      }
    } catch (error) {
      console.error("Error fetching voucher number:", error);
    }
    return null;
  };
  return {
    getNextVoucherNumber,
  };
};
export default useVoucher;
