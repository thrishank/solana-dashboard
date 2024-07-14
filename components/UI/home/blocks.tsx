"use client";
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
import React, { useEffect, useState } from "react";
import { ClipboardCopy } from "lucide-react";
import { connect, getConnection } from "@/lib/connect";
import Link from "next/link";

interface BlockData {
  blockHash: string;
  slot: number;
  time: string;
  txCount: number;
  leader: string;
  reward: number;
}

const BlocksTable: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const latestBlockHeight = await getConnection().getBlockHeight();
      const blockPromises = Array.from({ length: 5 }, (_, i) =>
        getConnection().getBlock(latestBlockHeight - i, {
          maxSupportedTransactionVersion: 0,
        })
      );
      const fetchedBlocks = await Promise.all(blockPromises);

      const formattedBlocks: BlockData[] = fetchedBlocks.reduce(
        (acc: BlockData[], block) => {
          if (block) {
            acc.push({
              blockHash: block.blockhash,
              slot: block.parentSlot + 1,
              time: "less than a minute ago",
              txCount: block.transactions.length,
              // @ts-ignore
              leader: block.rewards[0]?.pubkey ?? "Unknown",
              // @ts-ignore
              reward: block.rewards[0]?.lamports ?? 0,
            });
          }
          return acc;
        },
        []
      );

      setBlocks(formattedBlocks);
    } catch (error) {
      console.error("Error fetching blocks:", error);
    }
  };

  const shortenHash = (hash: string) =>
    `${hash.slice(0, 8)}...${hash.slice(-8)}`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Blocks</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Block Hash</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Tx Count</TableHead>
              <TableHead>Leader</TableHead>
              <TableHead className="text-right">Reward</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks.map((block) => (
              <TableRow key={block.blockHash}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <span className="text-blue-500 hover:underline cursor-pointer">
                      {shortenHash(block.blockHash)}
                    </span>
                    <ClipboardCopy className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" />
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/block/${block.slot}`}>{block.slot}</Link>
                </TableCell>
                <TableCell>{block.time}</TableCell>
                <TableCell>{block.txCount}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Link href={`/address/${block.leader}`}>
                      <span className="text-blue-500 hover:underline cursor-pointer">
                        {shortenHash(block.leader)}
                      </span>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <span className="mr-1">◎</span>
                    {(block.reward / 1e9).toFixed(9)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BlocksTable;
