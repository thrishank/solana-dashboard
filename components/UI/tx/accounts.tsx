import { Badge } from "@/components/badge";
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
import {
  LAMPORTS_PER_SOL,
  VersionedTransactionResponse,
} from "@solana/web3.js";
import Link from "next/link";

export default function Accounts({
  data,
}: {
  data: VersionedTransactionResponse;
}) {
  const accountKeys = data.transaction.message.staticAccountKeys.map((item) => {
    return item.toString();
  });
  console.log(data);
  const preBalance = data.meta?.preBalances;
  const postBalance = data.meta?.postBalances;

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold text-center">Accounts</h2>
      <Card className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Address</TableHead>

              <TableHead>Change (SOL)</TableHead>
              <TableHead>Post Balance (SOL)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.meta?.postBalances.map((item, idx) => (
              <TableRow>
                <TableCell>{idx}</TableCell>
                <TableCell>
                  <Link href={`/address/${accountKeys[idx]}`}>
                    {accountKeys[idx]}
                  </Link>
                </TableCell>
                <TableCell>
                  {postBalance![idx] - preBalance![idx] > 0 ? (
                    <Badge
                      variant="default"
                      className="bg-green-500 text-white"
                    >
                      {(postBalance![idx] - preBalance![idx]) /
                        LAMPORTS_PER_SOL}
                    </Badge>
                  ) : (
                    <Badge variant="default" className="bg-red-500 text-white">
                      {(postBalance![idx] - preBalance![idx]) /
                        LAMPORTS_PER_SOL}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{postBalance![idx] / LAMPORTS_PER_SOL}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}
