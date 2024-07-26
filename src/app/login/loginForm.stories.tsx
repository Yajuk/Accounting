import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import LoginForm from "./loginForm";
import { AccountProvider } from "@/context/accountProvider";
import { StyledEngineProvider } from "@mui/material";
import ThemeProviderWrapper from "@/components/theme/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const meta = {
  component: LoginForm,
  title: "Components/LoginForm",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <AccountProvider>
        <AppRouterCacheProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProviderWrapper>
              <Story />
            </ThemeProviderWrapper>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </AccountProvider>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginFormDefault: Story = {
  args: {
    password: "<PASSWORD>",
  },
  parameters: {
    controls: { expanded: true },
  },
};
