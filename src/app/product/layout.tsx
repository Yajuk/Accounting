import ResponsiveAppBar from "@/components/ui/AppBar/Appbar";

const pages = [
  { name: "Product", link: "/product/list" },
  { name: "Create Product", link: "/createProduct" },
];
const ChatLayout = async ({ children }: any) => {
  return (
    <div className="min-h-screen ">
      <ResponsiveAppBar pages={pages} />
      <main>{children}</main>
    </div>
  );
};

export default ChatLayout;
