import { Badge } from "@/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/HomeCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { connect } from "@/lib/connect";

export default async function Page({ params }: any) {
  const { sign } = params;

  const transactionData = await connect.getTransaction(sign, {
    commitment: "confirmed",
    maxSupportedTransactionVersion: 0,
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {transactionData && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Block Time</p>
                <p className="text-xl">
                  {new Date(
                    transactionData.blockTime || 1 * 1000
                  ).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Slot</p>
                <p className="text-xl">{transactionData.slot}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Version</p>
                <p className="text-xl">{transactionData.version}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Pre Balance</TableHead>
                <TableHead>Post Balance</TableHead>
              </TableRow>
            </TableHeader>
            {transactionData?.meta && (
              <TableBody>
                {transactionData.meta.preBalances.map((pre, index) => (
                  <TableRow key={index}>
                    <TableCell>Account {index + 1}</TableCell>
                    <TableCell>{pre}</TableCell>
                    <TableCell>
                      {transactionData.meta?.postBalances[index]}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Log Messages</CardTitle>
        </CardHeader>
        {transactionData?.meta?.logMessages && (
          <CardContent>
            <ul className="list-disc pl-4">
              {transactionData.meta.logMessages.map((log, index) => (
                <li key={index} className="text-sm">
                  {log}
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>


      {transactionData?.transaction?.message && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="header">
                <AccordionTrigger>Header</AccordionTrigger>
                <AccordionContent>
                  <pre className="bg-gray-100 p-2 rounded">
                    {JSON.stringify(transactionData.transaction.message.header, null, 2)}
                  </pre>
                </AccordionContent>
              </AccordionItem>
              {transactionData.transaction.message.accountKeys && (
                <AccordionItem value="accountKeys">
                  <AccordionTrigger>Account Keys</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-4">
                      {transactionData.transaction.message.accountKeys.map((key, index) => (
                        <li key={index} className="text-sm">{key}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
              {transactionData.transaction.message.instructions && (
                <AccordionItem value="instructions">
                  <AccordionTrigger>Instructions</AccordionTrigger>
                  <AccordionContent>
                    <pre className="bg-gray-100 p-2 rounded">
                      {JSON.stringify(transactionData.transaction.message.instructions, null, 2)}
                    </pre>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
            <div className="mt-4">
              <p className="text-sm font-medium">Recent Blockhash</p>
              <p className="text-xs break-all">{transactionData.transaction.message.recentBlockhash || 'N/A'}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
