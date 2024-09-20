import { Meta, StoryObj } from "@storybook/react";
import z from "zod";
import CustomForm from "./CustomForm";
import CategoryBrandCreate from "@/features/Product/CategoryDropdown/CategoryBrandCreate";
import CreateProductForm from "@/features/Product/ProductDropdown/ProductCreate";

const meta = {
  title: "Components/CustomForm",
  component: CustomForm,
} satisfies Meta<typeof CustomForm>;
export default meta;
type Story = StoryObj<typeof meta>;

const schema = z.object({
  search: z.string().min(1, { message: "Search field is required" }),
  dp: z.string().min(1, { message: "required" }),
  category: z.object({
    name: z.string(),
    description: z.string().optional(),
    _id: z.string(),
  }),
  brand: z.object({
    name: z.string(),
    description: z.string().optional(),
    _id: z.string(),
  }),
  "category-lookup": z.object({
    name: z.string(),
    description: z.string().optional(),
    _id: z.string(),
  }),
  "product-lookup": z.object({
    name: z.string(),
    description: z.string().optional(),
    _id: z.string(),
  }),
});
export const CustomFormDefault: Story = {
  args: {
    fields: [
      {
        name: "search",
        label: "Search",
        field: "text",
      },
      {
        name: "dp",
        label: "Deep",
        field: "select",
        options: [
          {
            label: "Option 1",
            value: "op1",
          },
          {
            label: "Option 2",
            value: "op2",
          },
        ],
      },
      {
        field: "category-dd",
        name: "category",
        label: "Category",
      },
      {
        field: "lookup",
        name: "brand",
        label: "Brand Lookup",
        model: "brand",
        CreateComponent: (props) => {
          return <CategoryBrandCreate type="brand" {...props} />;
        },
      },
      {
        field: "lookup",
        name: "category-lookup",
        label: "Category Lookup",
        model: "category",
        CreateComponent: (props) => {
          return <CategoryBrandCreate type="category" {...props} />;
        },
      },
      {
        field: "lookup",
        name: "product-lookup",
        label: "Product Lookup",
        model: "product",
        CreateComponent: (props) => {
          return <CreateProductForm {...props} />;
        },
      },
    ],
    breakpoints: {
      xs: 6,
      md: 3,
    },
    spacing: 1,
    schema,
    onSubmit(data) {
      console.log(data);
    },
  },
};
