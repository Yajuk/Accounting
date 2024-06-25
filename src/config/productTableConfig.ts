// components/ProductTableConfig.ts
import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  // { field: "_id", headerName: "ID", width: 120, type: "string" },
  { field: "name", headerName: "Name", width: 150, type: "string" },
  {
    field: "brand",
    headerName: "Brand",
    type: "string",
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
  { field: "price", headerName: "Price", width: 100, type: "number" },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "string",
    valueFormatter: (value) => {
      return new Date(value).toLocaleString();
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
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
