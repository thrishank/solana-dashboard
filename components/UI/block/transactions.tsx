import { Card } from "@/components/HomeCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { short } from "@/lib/connect";
import { BlockResponse } from "@solana/web3.js";
import Link from "next/link";

export default function Account({ data }: { data: BlockResponse }) {
  const calculateAmount = (item: any) => {
    const preBalance = item.meta.preBalances[0];
    const postBalance = item.meta.postBalances[0];
    return preBalance > postBalance ? preBalance - postBalance : 0;
  };

  const accountKey = (item: any) => {
    const sender = item.transaction.message.staticAccountKeys.map(
      (key: any) => {
        return key.toString();
      }
    );
    return sender[0];
  };

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold text-center">Transactions</h2>
      <Card className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Signature</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Compute</TableHead>
              <TableHead>Sender Address</TableHead>
              <TableHead>Version</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.transactions.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Link href={`/tx/${item.transaction.signatures[0]}`}>
                    {short(item.transaction.signatures[0], 5)}
                  </Link>
                </TableCell>
                <TableCell>{calculateAmount(item)}</TableCell>
                <TableCell>{item.meta?.computeUnitsConsumed}</TableCell>
                <TableCell>
                  <Link href={`/address/${accountKey(item)}`}>
                    {accountKey(item)}
                  </Link>
                </TableCell>
                <TableCell>{item.version}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}
