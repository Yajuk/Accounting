import ResponsiveAppBar from "@/components/ui/Menu/Menu";

const ChatLayout = async ({ children }: any) => {
  const pages = [
    { name: "Vendors", link: "/product/vouchers/types/:vendors" },
    { name: "Purchase", link: "/product/vouchers/types/Purchase" },
    { name: "Sales", link: "/product/vouchers/types/Sales" },
    { name: "Payment", link: "/product/vouchers/types/Payment" },
    { name: "Recept", link: "/product/vouchers/types/Recept" },
    { name: "Debit Note", link: "/product/vouchers/types/DebitNote" },
    { name: "Credit Note", link: "/product/vouchers/types/CreditNote" },
  ];
  return (
    <div className="min-h-screen flex ">
      <div className="w-2/12 border-r-2">
        <ResponsiveAppBar pages={pages} />
      </div>
      <main className="w-10/12 bg-gradient-to-r from-gray-100 to-blue-100">
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;
