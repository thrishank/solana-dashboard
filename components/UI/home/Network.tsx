"use client";

import { NetworkIcon } from "lucide-react";
import { SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { getConnection } from "@/lib/connect";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/HomeCard";

interface NetworkData {
  totalTransactions: string;
  totalAccounts: string;
  totalValidators: string;
  blockHeight: string;
  currentTps: string;
  peakTps: string;
  averageTps: string;
}

const getData = async (): Promise<NetworkData> => {
  const formatter = new Intl.NumberFormat("en", { notation: "standard" });
  const connect = getConnection();
  try {
    const txCount = await connect.getTransactionCount();
    const totalTransactions = formatter.format(Number(txCount));

    const slot = await connect
      .getAccountInfoAndContext(SYSVAR_CLOCK_PUBKEY)
      .then((res) => {
        return res.context.slot;
      });
    const totalAccounts = formatter.format(slot);

    const validators = await connect.getVoteAccounts();
    const totalValidators = formatter.format(
      validators.current.length + validators.delinquent.length
    );

    const block = await connect.getBlockHeight();
    const blockHeight = formatter.format(block);

    const performance = await connect.getRecentPerformanceSamples(60);
    const currentTps = formatter.format(
      performance[0]?.numTransactions / performance[0]?.samplePeriodSecs || 0
    );

    const peakTps = formatter.format(
      Math.max(
        ...performance.map(
          (sample) => sample.numTransactions / sample.samplePeriodSecs
        )
      )
    );

    const averageTps = formatter.format(
      performance.reduce((sum, sample) => {
        return sum + sample.numTransactions / sample.samplePeriodSecs;
      }, 0) / performance.length
    );

    return {
      totalTransactions,
      totalAccounts,
      totalValidators,
      blockHeight,
      currentTps,
      peakTps,
      averageTps
    };
  } catch (err) {
    console.error(err);
    return {
      totalTransactions: "",
      totalAccounts: "",
      totalValidators: "",
      blockHeight: "",
      currentTps: "",
      peakTps: "",
      averageTps: ""
    };
  }
};

export default function Network() {
  const [data, setData] = useState<NetworkData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getData();
        setData(newData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000); // Refresh every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  const {
    totalTransactions,
    totalAccounts,
    blockHeight,
    totalValidators,
    currentTps,
    peakTps,
    averageTps
  } = data;

  return (
    <div>
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-[#374151] font-bold  dark:text-[#FFFFFF]">
            Network Overview
          </CardTitle>
          <NetworkIcon className="w-6 h-6 text-muted-foreground dark:text-white" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {totalTransactions && (
              <Component name="Total Transactions" count={totalTransactions} />
            )}
            {totalAccounts && (
              <Component name="Current Slot" count={totalAccounts} />
            )}
            {totalValidators && (
              <Component name="Total Validators" count={totalValidators} />
            )}
            {blockHeight && (
              <Component name="Block Height" count={blockHeight} />
            )}
            {currentTps && <Component name="Current TPS" count={currentTps} />}
            {peakTps && <Component name="Average TPS" count={averageTps} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Component({ count, name }: { count: string; name: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="text-[#6b7280] dark:text-[#B0B0B0]">{name}</div>
      <div className="font-bold text-[#374151] dark:text-[#B0B0B0] text-sm sm:text-2xl">
        {count}
      </div>
    </div>
  );
}
