import { ActivityIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../HomeCard";
import { SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { connect } from "@/lib/connect";

const getData = async () => {
  const formatter = new Intl.NumberFormat("en", { notation: "standard" });
  try {
    const txCount = await connect.getTransactionCount();
    const totalTransactions = formatter.format(Number(txCount));

    const accounts = await connect
      .getAccountInfoAndContext(SYSVAR_CLOCK_PUBKEY)
      .then((res) => {
        return res.context.slot;
      });
    const totalAccounts = formatter.format(accounts);

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
    return {
      totalTransactions,
      totalAccounts,
      totalValidators,
      blockHeight,
      currentTps,
      peakTps,
    };
  } catch (err) {
    console.log(err);
    return {};
  }
};

export default async function Network() {

  const {
    totalTransactions,
    totalAccounts,
    blockHeight,
    totalValidators,
    currentTps,
    peakTps,
  } = await getData();

  return (
    <div>
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-[#374151] font-bold">
            Network Overview
          </CardTitle>
          <ActivityIcon className="w-6 h-6 text-[#6b7280]" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {totalTransactions && (
              <Component name="Total Transcations" count={totalTransactions} />
            )}
            {totalAccounts && (
              <Component name="Total Accounts" count={totalAccounts} />
            )}

            {totalValidators && (
              <Component name="Total Validators" count={totalValidators} />
            )}
            {blockHeight && (
              <Component name="Block Height" count={blockHeight} />
            )}
            {currentTps && <Component name="Current TPS" count={currentTps} />}

            {peakTps && <Component name="Peak TPS" count={peakTps} />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Component({ count, name }: { count: string; name: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="text-[#6b7280]">{name}</div>
      <div className="text-2xl font-bold text-[#374151]">{count}</div>
    </div>
  );
}
