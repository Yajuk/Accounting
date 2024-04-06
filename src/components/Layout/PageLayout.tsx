"use client";
import { useAccount } from "@/context/accountProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PageLayout = ({ children }: any) => {
  const { account } = useAccount();
  const router = useRouter();

  console.log(router);

  useEffect(() => {
    if (!account) {
      router.replace("/login");
    }

    if (account) {
      console.log(account);
      router.push("/");
    }
  }, [account]);
  return <>{children}</>;
};
export default PageLayout;
