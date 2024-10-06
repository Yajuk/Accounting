import ResponsiveAppBar from "@/components/ui/Menu/Menu";

const ChatLayout = async ({ children }: any) => {
  const pages = [
    { name: "Vendors", link: "/product/vouchers/:vendors" },
    { name: "Purchase", link: "/product/vouchers/Purchase" },
    { name: "Sales", link: "/product/vouchers/Sales" },
    { name: "Payment", link: "/product/vouchers/Payment" },
    { name: "Recept", link: "/product/vouchers/Recept" },
    { name: "Debit Note", link: "/product/vouchers/DebitNote" },
    { name: "Credit Note", link: "/product/vouchers/CreditNote" },
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
