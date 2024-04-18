"use client";
import { useAccount } from "@/context/accountProvider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PageLayout = ({ children }: any) => {
  const { account } = useAccount();
  const router = useRouter();
  const pathName = usePathname();

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
      router.replace(pathName);
    }
  }, [account]);
  return <>{children}</>;
};
export default PageLayout;
