"use client";
import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
} from "@mui/material";
import CustomForm from "@/components/ui/CustomForm/CustomForm";

type Product = {
  productId: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

type PurchaseOrderFormValues = {
  supplierId: string;
  purchaseDate: string;
  paymentTerms: string;
  notes: string;
  products: Product[];
};

const fields = [
  { name: "productId", label: "Product" },
  { name: "quantity", label: "Quantity" },
  { name: "unitPrice", label: "Unit Price" },
];
const PurchaseOrder = () => {
  return <>Purchase order form</>;
};

export default PurchaseOrder;
