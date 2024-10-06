import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "voucherNumber",
    headerName: "Voucher Number",
    width: 150,
    type: "string",
  },
  {
    field: "invoiceNumber",
    headerName: "Invoice Number",
    width: 150,
    type: "string",
  },
  {
    field: "voucherDate",
    headerName: "Voucher Date",
    width: 180,
    type: "date",
    valueFormatter: (value) => {
      return new Date(value).toLocaleDateString();
    },
  },
  {
    field: "voucherType",
    headerName: "Voucher Type",
    width: 150,
    type: "string",
  },
  {
    field: "payeeOrPayer",
    headerName: "Payee/Payer",
    width: 220,
    type: "string",
  },
  { field: "amount", headerName: "Amount", width: 120, type: "number" },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    width: 150,
    type: "string",
  },
  { field: "totalGST", headerName: "Total GST", width: 120, type: "number" },
  { field: "cgst", headerName: "CGST", width: 120, type: "number" },
  { field: "sgst", headerName: "SGST", width: 120, type: "number" },
  // {
  //   field: "items",
  //   headerName: "Items",
  //   width: 150,
  //   valueGetter: (params) => params?.value?.length,
  // },
  // {
  //   field: "ledgerEntries",
  //   headerName: "Ledger Entries",
  //   width: 150,
  //   valueGetter: (params) => params?.value?.length,
  // },
  {
    field: "description",
    headerName: "Description",
    width: 300,
    type: "string",
  },
];
export const styles = {
  flex: 1,
  "& .MuiDataGrid-row": {
    borderBottom: "none",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
  },
};
