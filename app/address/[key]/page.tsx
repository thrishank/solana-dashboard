"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  connect,
  getReadableTimeDifference,
  ReadableTime,
  short,
  Transaction,
} from "@/lib/connect";
import { AccountInfo, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import axios from "axios";

import Link from "next/link";
import { useEffect, useState } from "react";

const HELIUS_API_KEY = "20475b23-b7f2-46be-badc-ad4f62baf079";
const HELIUS_API_URL = `https://api-devnet.helius.xyz/v0/addresses/`;

export default function Account({ params }: any) {
  const [accountdata, setAccountData] = useState<AccountInfo<Buffer> | null>();
  const [txData, setTxData] = useState<Transaction[]>();

  const { key } = params;
  async function fetchData() {
    try {
      const response = await axios.get(`${HELIUS_API_URL}${key}/transactions`, {
        params: {
          "api-key": HELIUS_API_KEY,
          limit: 10,
        },
      });
      setTxData(response.data);

      const data = await connect.getAccountInfo(new PublicKey(key));
      console.log(data);
      setAccountData(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:bg-[#121212]">
      <main className="container mx-auto px-4 py-8 flex-1">
        <h2 className="text-2xl font-bold text-center dark:text-white">Accounts</h2>
        <section className=" dark:text-white rounded-lg shadow-sm p-6 mb-8 bg-white dark:bg-[#121212]">
          <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-100 rounded-lg p-4 dark:bg-[#020817]">
              <h3 className="text-sm font-medium mb-2">Solana Balance (SOL)</h3>
              {accountdata?.lamports && (
                <div className="text-lg font-semibold">
                  {accountdata?.lamports / LAMPORTS_PER_SOL}
                </div>
              )}
            </div>
            <div className="bg-gray-100 rounded-lg p-4 dark:bg-[#020817]">
              <h3 className="text-sm font-medium mb-2">Account Public Key</h3>
              <div className="text-lg font-semibold">
                <code>{short(key)}</code>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 dark:bg-[#020817]">
              <h3 className="text-sm font-medium mb-2">Executable Status</h3>
              {accountdata?.executable ? (
                <div className="text-lg font-semibold">True</div>
              ) : (
                <div className="text-lg font-semibold">False</div>
              )}
            </div>
          </div>
        </section>
        <section className="dark:text-white">
          <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TRANSACTION SIGNATURE</TableHead>
                  <TableHead>BLOCK</TableHead>
                  <TableHead>AGE</TableHead>
                  <TableHead>TIMESTAMP</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {txData?.map((item) => (
                  <TableRow key={item.signature}>
                    <TableCell>
                      <Link href={`/tx/${item.signature}`}>
                        {short(item.signature, 10)}
                      </Link>
                    </TableCell>
                    <TableCell>{item.slot}</TableCell>
                    <TableCell>
                      {getReadableTimeDifference(item.timestamp)}
                    </TableCell>
                    <TableCell>{ReadableTime(item.timestamp)}</TableCell>
                    <TableCell>{item.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  );
}
