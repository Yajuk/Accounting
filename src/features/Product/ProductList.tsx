"use client";
import DataTable from "@/components/ui/DataTable/DataTable";
import * as ProductService from "@/services/product/productService";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState<ProductService.IProductData[]>([]);

  const getProducts = async () => {
    try {
      const resp = await ProductService.getProducts();

      if (resp.statusCode === 200) {
        setProducts(resp.data.data);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns: GridColDef[] = [
    // { field: "_id", headerName: "ID", width: 120, type: "string" },
    { field: "name", headerName: "Name", width: 150, type: "string" },
    {
      field: "brand",
      headerName: "Brand",
      width: 150,
      type: "string",
      valueGetter: (value) => {
        return value.name;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      type: "string",
      valueGetter: (value) => {
        return value.name;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      type: "string",
    },
    { field: "price", headerName: "Price", width: 100, type: "number" },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 180,
      type: "string",
      valueFormatter: (value) => {
        return new Date(value).toLocaleString();
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 180,
      type: "string",
    },
  ];

  return (
    <DataTable getRowId={(row) => row._id} columns={columns} rows={products} />
  );
};

export default ProductList;
