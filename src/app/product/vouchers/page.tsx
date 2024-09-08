import PurchaseOrder from "@/features/Product/Purchase/PurchaseOrder";
import { Button } from "@mui/material";

const VoucherPage = () => {
  return (
    <div className="flex flex-col gap-6  w-full mx-auto min-h-screen p-8 bg-gradient-to-r from-gray-100 to-blue-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight text-center">
        Accounting Vouchers
      </h1>
      <p className="text-xl text-gray-600 leading-relaxed text-center">
        Manage and review your financial transactions with our comprehensive
        voucher system.
      </p>
      <div className="grid grid-cols-1  md:grid-cols-1 gap-6 mt-8">
        <div className="bg-white text-center p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Create Voucher
          </h2>
          <p className="text-gray-600 mb-4">
            Record new financial transactions quickly and accurately.
          </p>
          <Button className="text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            New Voucher
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoucherPage;
