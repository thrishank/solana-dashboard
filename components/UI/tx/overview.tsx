"use client";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/HomeCard";
import { ReadableTime } from "@/lib/connect";
import {
  LAMPORTS_PER_SOL,
  VersionedTransactionResponse,
} from "@solana/web3.js";
import {
  Badge,
  CopyIcon,
  InspectionPanelIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Overview({
  data,
}: {
  data: VersionedTransactionResponse;
}) {
  const router = useRouter();

  const timestamp: number = Number(data.blockTime);

  const formattedDate: string = ReadableTime(timestamp);
  return (
    <section>
      <h2 className="text-2xl font-bold text-center">Transaction</h2>
      <Card className="mt-4">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Overview</CardTitle>
          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              className="flex items-center space-x-1"
              onClick={() => {
                router.refresh();
              }}
            >
              <RefreshCwIcon className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Signature</p>
              <p className="flex items-center space-x-2">
                <span>{data.transaction.signatures[0].substr(0, 3)}</span>
                <span>...</span>
                <span>
                  {data.transaction.signatures[0].substr(
                    data.transaction.signatures[0].length - 3,
                    data.transaction.signatures[0].length
                  )}
                </span>
                <CopyIcon className="h-4 w-4 text-gray-500" />
              </p>
            </div>
            <div>
              <p className="font-medium">Result</p>
              {data?.meta?.err ? (
                <div className="text-red-500">Failed</div>
              ) : (
                <div className="text-green-500">Success</div>
              )}
            </div>
            <div>
              <p className="font-medium">Timestamp</p>
              <p>{formattedDate}</p>
            </div>

            <div>
              <p className="font-medium">Slot</p>
              <p>
                {new Intl.NumberFormat("en", { notation: "standard" }).format(
                  data.slot
                )}
              </p>
            </div>
            <div>
              <p className="font-medium">Recent Blockhash</p>
              <span>
                {data.transaction.message.recentBlockhash.substring(0, 6)}
              </span>
              <span>...</span>
            </div>
            <div>
              <p className="font-medium">Fee (SOL)</p>
              {data?.meta?.fee && <p>{data.meta?.fee / LAMPORTS_PER_SOL}</p>}
            </div>
            <div>
              <p className="font-medium">Compute units consumed</p>
              <p>{data.meta?.computeUnitsConsumed}</p>
            </div>
            <div>
              <p className="font-medium">Transaction Version</p>
              <p>{data.version}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
