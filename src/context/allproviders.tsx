import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { StyledEngineProvider } from "@mui/material";

import { AccountProvider } from "./accountProvider";
import ThemeProviderWrapper from "@/components/theme/ThemeProvider";
import PageLayout from "@/components/Layout/PageLayout";
import { Chat } from "@mui/icons-material";
import { ChatProvider } from "./ChatProvider";

const AllProviders = ({ children }: any) => {
  return (
    <AccountProvider>
      <ChatProvider>
        <AppRouterCacheProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProviderWrapper>
              {/* <PageLayout>{children}</PageLayout> */}
              {children}
            </ThemeProviderWrapper>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </ChatProvider>
    </AccountProvider>
  );
};
export default AllProviders;
