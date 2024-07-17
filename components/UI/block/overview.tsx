"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/HomeCard";
import { getReadableTimeDifference, ReadableTime } from "@/lib/connect";
import { BlockResponse } from "@solana/web3.js";
import { CopyIcon } from "lucide-react";
import Link from "next/link";

export default function Overview({ data }: { data: BlockResponse }) {
  let rewards = 0;
  data?.rewards?.map((item) => (rewards += item.lamports));

  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 text-gray-800 dark:text-white">
      <h2 className="text-3xl font-bold text-center mb-8 ">Transaction</h2>
      <Card className="shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <CardHeader className="p-6 text-center">
          <CardTitle className="text-2xl font-semibold">Overview</CardTitle>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-1">Block</p>
              <p className="flex items-center space-x-2 ">
                <span className="text-lg">{data.parentSlot}</span>
                <CopyIcon
                  className="h-5 w-5 cursor-pointer transition-colors duration-200"
                  onClick={() =>
                    navigator.clipboard.writeText(data.parentSlot.toString())
                  }
                />
              </p>
            </div>

            <div>
              <p className="font-medium mb-1">Timestamp</p>
              <div className=" flex">
                <div className="text-lg">
                  {getReadableTimeDifference(data.blockTime || 0)}
                </div>
                <div className="text-sm px-4 ">
                  {ReadableTime(data.blockTime || 0)}
                </div>
              </div>
            </div>

            <div>
              <p className="font-medium mb-1">Block Hash</p>
              <div className=" break-all">{data.blockhash}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-medium  mb-1">Prev Block Hash</p>
              <p className=" break-all">
                {data.previousBlockhash && data.previousBlockhash}
              </p>
            </div>

            <div>
              <p className="font-medium  mb-1">Leader</p>
              {data.rewards && (
                <p className=" break-all">
                  <Link href={`/address/${data.rewards[0].pubkey}`}>
                    {data.rewards[0].pubkey}
                  </Link>
                </p>
              )}
            </div>

            <div>
              <p className="font-medium  mb-1">Rewards (LAMPORTS)</p>
              <p className="">{data.rewards && rewards}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
