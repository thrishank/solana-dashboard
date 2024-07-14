"use client";
import Accounts from "@/components/UI/tx/accounts";
import Overview from "@/components/UI/tx/overview";
import { connect } from "@/lib/connect";

import { VersionedTransactionResponse } from "@solana/web3.js";

import { useEffect, useState } from "react";

export default function Page({ params }: any) {
  const { sign } = params;
  const [transactionData, setTransactionData] =
    useState<VersionedTransactionResponse | null>();

  const fetchData = async () => {
    const data = await connect.getTransaction(sign, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });
    setTransactionData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:text-white dark:bg-[#121212]">
      <main className="container mx-auto px-4 py-8 flex-1">
        {transactionData && <Overview data={transactionData} />}
        {transactionData && <Accounts data={transactionData} />}
      </main>
    </div>
  );
}
