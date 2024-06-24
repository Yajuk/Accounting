"use client";
import { useAccount } from "@/context/accountProvider";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PageLayout = ({ children }: any) => {
  const { account } = useAccount();
  const router = useRouter();
  const pathName = usePathname();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!account) {
      router.replace("/login");
      return;
    }
    if (account && pathName === "/login") {
      router.replace("/");
      return;
    }
    if (account && pathName) {
      setUserName(account.name);
      router.replace(pathName);
    }
  }, [account]);
  return <Box>{children}</Box>;
};
export default PageLayout;
