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

export default function Accounts({
  data,
}: {
  data: VersionedTransactionResponse;
}) {
  const accountKeys = data.transaction.message.staticAccountKeys.map((item) => {
    return item.toString();
  });

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
              <TableHead>Pre Balance (SOL)</TableHead>
              <TableHead>Change (SOL)</TableHead>
              <TableHead>Post Balance (SOL)</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>{short(accountKeys[0])}</TableCell>
              <TableCell>{preBalance![0] / LAMPORTS_PER_SOL}</TableCell>
              <TableCell>
                <Badge variant="default" className="bg-red-500 text-white">
                  {(postBalance![0] - preBalance![0]) / LAMPORTS_PER_SOL}
                </Badge>
              </TableCell>
              <TableCell>{postBalance![0] / LAMPORTS_PER_SOL}</TableCell>
              <TableCell className="flex flex-wrap">
                <Badge variant="default" className="bg-blue-500 text-white">
                  Fee Payer
                </Badge>
                <Badge variant="default" className="bg-purple-500 text-white">
                  Signer
                </Badge>
                <Badge variant="default" className="bg-gray-500 text-white">
                  Writable
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>{short(accountKeys[1])}</TableCell>
              <TableCell>{preBalance![1] / LAMPORTS_PER_SOL}</TableCell>
              <TableCell>
                <Badge variant="default" className="bg-green-500 text-white">
                  {(postBalance![1] - preBalance![1]) / LAMPORTS_PER_SOL}
                </Badge>
              </TableCell>
              <TableCell>{postBalance![1] / LAMPORTS_PER_SOL}</TableCell>
              <TableCell>
                <Badge variant="default" className="bg-gray-500 text-white">
                  Writable
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>System Program</TableCell>
              <TableCell>0.000000000</TableCell>
              <TableCell>
                <Badge variant="default" className="bg-gray-500 text-white">
                  0
                </Badge>
              </TableCell>
              <TableCell>0.000000001</TableCell>
              <TableCell>
                <Badge variant="default" className="bg-purple-500 text-white">
                  Program
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}
