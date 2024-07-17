import Charts from "@/components/UI/home/TPS";
import Network from "@/components/UI/home/Network";
import Token from "@/components/UI/home/TokenMetrics";
import TxActivity from "@/components/UI/home/txActivity";
import RecentSolanaTransactions from "@/components/UI/home/recentTx";
import SolanaPriceCard from "@/components/UI/home/solana";
import BlocksTable from "@/components/UI/home/blocks";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5] dark:bg-[#121212]">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <Network />
        <Token />
        <Charts />
      </div>
      <div className="flex flex-col lg:flex-row p-6 gap-6">
        <SolanaPriceCard />
        <RecentSolanaTransactions />
      </div>
      <div className="gap-6 p-6">
        <BlocksTable />
      </div>
    </div>
  );
}

// health check status getHealth()
// accounts page onAccountChange() webhook
