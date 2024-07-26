import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { useForm } from "react-hook-form";
import ProductDropdown from "../ProductDropdown";

const WrapperComponent = () => {
  const { control, setValue, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(console.log)}>
      {" "}
      <ProductDropdown
        control={control}
        name="product"
        setValue={setValue}
      />{" "}
    </form>
  );
};

const meta = {
  title: "Components/ProductDropdown",
  component: WrapperComponent,
} satisfies Meta<typeof WrapperComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductDropdownDefault: Story = {
  args: {},
};
