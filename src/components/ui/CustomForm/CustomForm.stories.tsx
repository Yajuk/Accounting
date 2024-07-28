import { Meta, StoryObj } from "@storybook/react";
import z from "zod";
import CustomForm from "./CustomForm";

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
  // brand: z.object({
  //   name: z.string(),
  //   description: z.string().optional(),
  //   _id: z.string(),
  // }),
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
