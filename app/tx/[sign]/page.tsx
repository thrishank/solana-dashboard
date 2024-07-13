"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/HomeCard";
import { Input } from "@/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import Accounts from "@/components/UI/tx/accounts";
import Overview from "@/components/UI/tx/overview";
import { connect } from "@/lib/connect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { VersionedTransactionResponse } from "@solana/web3.js";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page({ params }: any) {
  const { sign } = params;
  const [transactionData, setTransactionData] =
    useState<VersionedTransactionResponse | null>();

  const fetchData = async () => {
    const data = await connect.getTransaction(sign, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });
    setTransactionData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    // <div className="flex justify-center flex-col h-screen items-center">
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Transaction Overview</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       {transactionData && (
    //         <div className="grid grid-cols-2 gap-4">
    //           <div>
    //             <p className="text-sm font-medium">Block Time</p>
    //             <p className="text-xl">
    //               {new Date(
    //                 transactionData.blockTime || 1 * 1000
    //               ).toLocaleString()}
    //             </p>
    //           </div>
    //           <div>
    //             <p className="text-sm font-medium">Slot</p>
    //             <p className="text-xl">{transactionData.slot}</p>
    //           </div>
    //           <div>
    //             <p className="text-sm font-medium">Version</p>
    //             <p className="text-xl">{transactionData.version}</p>
    //           </div>
    //         </div>
    //       )}
    //     </CardContent>
    //   </Card>

    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Balances</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <Table>
    //         <TableHeader>
    //           <TableRow>
    //             <TableHead>Account</TableHead>
    //             <TableHead>Pre Balance</TableHead>
    //             <TableHead>Post Balance</TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         {transactionData?.meta && (
    //           <TableBody>
    //             {transactionData.meta.preBalances.map((pre, index) => (
    //               <TableRow key={index}>
    //                 <TableCell>Account {index + 1}</TableCell>
    //                 <TableCell>{pre}</TableCell>
    //                 <TableCell>
    //                   {transactionData.meta?.postBalances[index]}
    //                 </TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         )}
    //       </Table>
    //     </CardContent>
    //   </Card>

    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Log Messages</CardTitle>
    //     </CardHeader>
    //     {transactionData?.meta?.logMessages && (
    //       <CardContent>
    //         <ul className="list-disc pl-4">
    //           {transactionData.meta.logMessages.map((log, index) => (
    //             <li key={index} className="text-sm">
    //               {log}
    //             </li>
    //           ))}
    //         </ul>
    //       </CardContent>
    //     )}
    //   </Card>

    //   {message && (
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Transaction Message</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <Accordion type="single" collapsible>
    //           {message.header && (
    //             <AccordionItem value="header">
    //               <AccordionTrigger>Header</AccordionTrigger>
    //               <AccordionContent>
    //                 <pre className="bg-gray-100 p-2 rounded">
    //                   {JSON.stringify(message.header, null, 2)}
    //                 </pre>
    //               </AccordionContent>
    //             </AccordionItem>
    //           )}
    //           {/* {accountKeys.length > 0 && (
    //             <AccordionItem value="accountKeys">
    //               <AccordionTrigger>Account Keys</AccordionTrigger>
    //               <AccordionContent>
    //                 <ul className="list-disc pl-4">
    //                   {accountKeys.map((key: any, index: number) => (
    //                     <li key={index} className="text-sm">
    //                       {key.toString()}
    //                     </li>
    //                   ))}
    //                 </ul>
    //               </AccordionContent>
    //             </AccordionItem>
    //           )} */}
    //           {instructions && (
    //             <AccordionItem value="instructions">
    //               <AccordionTrigger>Instructions</AccordionTrigger>
    //               <AccordionContent>
    //                 <pre className="bg-gray-100 p-2 rounded">
    //                   {JSON.stringify(instructions, null, 2)}
    //                 </pre>
    //               </AccordionContent>
    //             </AccordionItem>
    //           )}
    //         </Accordion>
    //         <div className="mt-4">
    //           <p className="text-sm font-medium">Recent Blockhash</p>
    //           <p className="text-xs break-all">
    //             {message.recentBlockhash || "N/A"}
    //           </p>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   )}

    //   {transactionData?.transaction?.signatures && (
    //     <Card>
    //       <CardHeader>
    //         <CardTitle>Signatures</CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <ul className="list-disc pl-4">
    //           {transactionData.transaction.signatures.map(
    //             (signature, index) => (
    //               <li key={index} className="text-xs break-all">
    //                 {signature}
    //               </li>
    //             )
    //           )}
    //         </ul>
    //       </CardContent>
    //     </Card>
    //   )}
    // </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 w-full max-w-4xl">
        <div className="relative w-full">
          <SearchIcon className="absolute left-4 top-4 h-5 w-5 text-gray-500" />
          <Input
            type="search"
            placeholder="Search for blocks, accounts, transactions, programs, and tokens"
            className="w-full pl-12 pr-4 py-2 border rounded-md"
          />
        </div>
      </header>
      <main className="flex flex-col gap-4 p-4 w-full max-w-4xl">
        {transactionData && <Overview data={transactionData} />}
        {transactionData && <Accounts data={transactionData} />}
      </main>
    </div>
  );
}
