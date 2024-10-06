import PurchaseVoucherForm from "@/features/Product/Vouchers/PurchaseVoucherForm";
import VoucherList from "@/features/Product/Vouchers/VoucherList";
interface Props {
  params: {
    vType:
      | "Purchase"
      | "Sales"
      | "Payment"
      | "Recept"
      | "DebitNote"
      | "CreditNote";
  };
}
const RenderVouchers = ({ params: { vType } }: Props) => {
  switch (vType) {
    case "Purchase":
      return <PurchaseVoucherForm id="670262548fd128194ccbf18a" />;
    // case "Sales":
    //   return <SalesOrder />;
    // case "Payment":
    //   return <PaymentOrder />;
    // case "Recept":
    //   return <ReceptOrder />;
    // case "DebitNote":
    //   return <DebitNote />;
    // case "CreditNote":
    //   return <CreditNote />;
    default:
      return <VoucherList />;
  }
};

export default RenderVouchers;
