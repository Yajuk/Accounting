"use client";
import React, { use, useState } from "react";
import { Button, Card, TextField } from "@mui/material";
import { ISearchFilter } from "@/utils/types/productTypes";
import CategoryDropdown from "@/features/Product/CategoryDropdown/CtaegoryDropdown";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextField from "@/components/ui/FormTextField/FormTextField";
const searchFormSchema = z
  .object({
    search: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    category: z
      .object({
        name: z.string().optional(),
        description: z.string().optional(),
        _id: z.string().optional(),
      })
      .optional(),
    brand: z
      .object({
        name: z.string().optional(),
        description: z.string().optional(),
        _id: z.string().optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: "End date must be greater than or equal to start date",
      path: ["endDate"], // path of error
    },
  );
type IFormInput = z.infer<typeof searchFormSchema>;
const SearchFilter: React.FC<{
  onFilterChange: (filters: ISearchFilter) => void;
}> = ({ onFilterChange }) => {
  const { control, handleSubmit, reset, setValue } = useForm<IFormInput>({
    defaultValues: {
      search: "",
      startDate: "",
      endDate: "",
      category: {},
      brand: {},
    },
    resolver: zodResolver(searchFormSchema),
  });

  const handleFilterChange = ({
    search,
    startDate,
    endDate,
    category,
    brand,
  }: IFormInput) => {
    const filters: ISearchFilter = {
      search,
    };
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        alert("End date must be greater than start date");
        return;
      }
      filters.startDate = startDate;
      filters.endDate = endDate;
    }
    if (category) {
      filters.category = category._id;
    }
    if (brand) {
      filters.brand = brand._id;
    }

    onFilterChange(filters);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    handleFilterChange(data);
  };

  return (
    <Card className="flex flex-col gap-4 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextField
          name={"search"}
          control={control}
          label={"Product Name"}
          className="mb-4"
          sx={{ mb: 2 }}
        />
        <FormTextField
          label="Start Date"
          name="startDate"
          type="date"
          control={control}
          focused
          sx={{ mb: 2 }}
          className="mb-4"
        />
        <FormTextField
          label="End Date"
          type="date"
          control={control}
          name="endDate"
          focused
          sx={{ mb: 2 }}
          className="mb-2"
        />
        <CategoryDropdown
          type="category"
          name="category"
          control={control}
          setValue={setValue}
          className="mb-2"
        />
        <CategoryDropdown
          type="brand"
          name="brand"
          control={control}
          setValue={setValue}
          className="mb-2"
        />
        <Button
          type="submit"
          variant="contained"
          className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-md"
        >
          Apply Filters
        </Button>
        <Button
          onClick={() =>
            reset({
              search: "",
              startDate: "",
              endDate: "",
              category: {},
              brand: {},
            })
          }
          className="py-2 px-4 rounded-md"
        >
          Reset
        </Button>
      </form>
    </Card>
  );
};

export default SearchFilter;
