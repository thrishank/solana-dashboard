"use client";
import { useState, useEffect } from "react";

import { connect, formatter, short } from "@/lib/connect";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/HomeCard";
import { ActivityIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import Link from "next/link";
import { Badge } from "@/components/badge";

export default function RecentSolanaTransactions() {
  const [data, setData] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(true);
 
  const fetchData = async () => {
    try {
     
      const latestBlockhash = await connect.getLatestBlockhash();
      const block = await connect.getBlock(
        latestBlockhash.lastValidBlockHeight
      );
      const lastTenTx = block?.transactions.slice(-5) || [];
      setData(lastTenTx);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 5000);
    return () => clearInterval(timer);
  }, []);

  const calculateAmount = (item: any) => {
    const preBalance = item.meta.preBalances[0];
    const postBalance = item.meta.postBalances[0];
    return preBalance > postBalance ? preBalance - postBalance : 0;
  };

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-[#374151] font-bold">
          Recent Transactions
        </CardTitle>
        <ActivityIcon className="w-6 h-6 text-[#6b7280]" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading transactions...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#6b7280]">Tx Hash</TableHead>
                <TableHead className="text-[#6b7280]">
                  Amount (LAMPORTS)
                </TableHead>
                <TableHead className="text-[#6b7280]">Fee</TableHead>
                <TableHead className="text-[#6b7280]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Link href={`/tx/${item.transaction.signatures[0]}`}>
                      {short(item.transaction.signatures[0])}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {formatter.format(calculateAmount(item))}
                  </TableCell>
                  <TableCell>{formatter.format(item.meta.fee)}</TableCell>
                  {item.meta.err === null ? (
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-[#32db54] text-[#374151]"
                      >
                        Confirmed
                      </Badge>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-[#f64e30] text-[#374151]"
                      >
                        Failed
                      </Badge>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
