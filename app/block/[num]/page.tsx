"use client";
import Overview from "@/components/UI/block/overview";
import Account from "@/components/UI/block/transactions";
import { getConnection } from "@/lib/connect";
import { BlockResponse } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function Page({ params }: any) {
  const [blockData, setBlockData] = useState<BlockResponse | null>(null);

  const { num } = params;

  const fetchData = async () => {
    const data = await getConnection().getBlock(Number(num), {
      maxSupportedTransactionVersion: 0,
      rewards: true,
      commitment: "confirmed",
    });
    // @ts-ignore
    setBlockData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:text-white dark:bg-[#121212]">
      <main className="container mx-auto px-4 py-8 flex-1">
        {blockData && <Overview data={blockData} />}
        {blockData && <Account data={blockData} />}
      </main>
    </div>
  );
}
