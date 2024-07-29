import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import CategoryDropdown from "../CategoryDropdown/CtaegoryDropdown";

const WrapperComponent = ({
  type = "brand",
}: {
  type: "brand" | "category";
}) => {
  const { control, setValue, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(console.log)}>
      {" "}
      <CategoryDropdown
        control={control}
        name="category"
        setValue={setValue}
        type={type}
      />{" "}
    </form>
  );
};

const meta = {
  component: WrapperComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof WrapperComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CategoryDropdownDefault: Story = {
  args: {
    type: "category",
  },
};

export const BrandDropdownDefault: Story = {
  args: {
    type: "brand",
  },
};
