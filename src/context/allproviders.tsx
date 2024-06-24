import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { StyledEngineProvider } from "@mui/material";

import { AccountProvider } from "./accountProvider";
import ThemeProviderWrapper from "@/components/theme/ThemeProvider";
import { ChatProvider } from "./ChatProvider";
import PageLayout from "@/components/Layout/PageLayout";

const AllProviders = ({ children }: any) => {
  return (
    <AccountProvider>
      <ChatProvider>
        <AppRouterCacheProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProviderWrapper>
              <PageLayout>{children}</PageLayout>
            </ThemeProviderWrapper>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </ChatProvider>
    </AccountProvider>
  );
};
export default AllProviders;
