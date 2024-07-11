import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

export default async function Home() {
  const connect = new Connection(clusterApiUrl("mainnet-beta"));

  const supply = await connect.getSupply();
  console.log(supply.value.total / LAMPORTS_PER_SOL, "SOL");

  const slot = await connect.getSlot();
  console.log(slot);

  const epcoh = await connect.getEpochInfo();
  console.log(epcoh);
  return (
    <div>
      <h1>Solana Explorer</h1>
    </div>
  );
}
