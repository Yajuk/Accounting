import * as voucherService from "./../services/product/voucherService";
import { useState, useCallback, useEffect } from "react";
import {
  nextVoucherNumber,
  getVouchers,
} from "@/services/product/voucherService";
import { IPaginationModel } from "@/utils/types/productTypes";

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
  const getVoucherById = async (id: string): Promise<any | null> => {
    try {
      const response = await voucherService.getVoucherById(id);
      if (response.statusCode === 200) {
        const voucher = response.data;
        return voucher;
      }
    } catch (error) {
      console.error("Error fetching voucher:", error);
    }
    return null;
  };
  return {
    getNextVoucherNumber,
    getVoucherById,
  };
};
export default useVoucher;

export const useVouchersList = (
  paginationModel: IPaginationModel,
  search: string,
) => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getVouchersList = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await getVouchers({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        search: search || "",
        searchColumns: ["invoiceNumber", "voucherNumber"],
        //search: search || searchFilters?.search,
        // startDate: searchFilters?.startDate,
        // endDate: searchFilters?.endDate,
      });

      if (resp.statusCode === 200) {
        setVouchers(resp.data.data);
        setTotalCount(resp.data.totalCount);
      } else {
        console.error(`Error fetching Vouchers: ${resp.statusCode}`);
      }
    } catch (error) {
      console.error("Error fetching Vouchers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [paginationModel, search]);

  const reFetchVouchers = () => {
    getVouchersList();
  };
  useEffect(() => {
    getVouchersList();
  }, [getVouchersList]);
  return { vouchers, totalCount, isLoading, reFetchVouchers };
};
