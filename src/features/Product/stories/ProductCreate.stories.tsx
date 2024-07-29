import { StoryObj, Meta } from "@storybook/react";
import ProductCreate from "../ProductDropdown/ProductCreate";

const meta = {
  component: ProductCreate,
} satisfies Meta<typeof ProductCreate>;

export default meta;

export const Default: StoryObj = {
  args: {},
};

export const WithInitialValues: StoryObj = {
  args: {
    productId: "66a4dc890703d95b011e62f4",
  },
};
