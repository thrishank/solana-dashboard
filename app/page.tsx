import Navbar from "@/components/UI/Navbar";
import Network from "@/components/UI/Network";
import Token from "@/components/UI/TokenMetrics";
import Transaction from "@/components/UI/transactions";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      {/* <Navbar />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <Network />
        <Token />
      </div> */}
      <Transaction />
    </div>
  );
}
