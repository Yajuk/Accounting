import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { StyledEngineProvider } from "@mui/material";

import { AccountProvider } from "./accountProvider";
import ThemeProviderWrapper from "@/components/theme/ThemeProvider";
import PageLayout from "@/components/Layout/PageLayout";

const AllProviders = ({ children }: any) => {
  return (
    <AccountProvider>
      <AppRouterCacheProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProviderWrapper>
            <PageLayout>{children}</PageLayout>
          </ThemeProviderWrapper>
        </StyledEngineProvider>
      </AppRouterCacheProvider>
    </AccountProvider>
  );
};
export default AllProviders;
