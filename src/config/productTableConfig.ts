// components/ProductTableConfig.ts
import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  // { field: "_id", headerName: "ID", width: 120, type: "string" },
  { field: "name", headerName: "Name", width: 150, type: "string" },
  { field: "quantity", headerName: "Quantity", width: 100, type: "number" },
  { field: "unit", headerName: "Unit", width: 50, type: "string" },
  { field: "price", headerName: "MRP", width: 100, type: "number" },
  {
    field: "brand",
    headerName: "Brand",
    type: "string",
    editable: true,
    valueGetter: (value) => {
      return value.name;
    },
  },
  {
    field: "category",
    headerName: "Category",
    type: "string",
    valueGetter: (value) => {
      return value.name;
    },
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "string",
    valueFormatter: (value) => {
      return new Date(value).toLocaleDateString();
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    type: "string",
    valueFormatter: (value) => {
      return new Date(value).toLocaleDateString();
    },
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
