import { connect } from "@/lib/connect";
import { PublicKey } from "@solana/web3.js";

export default function Transaction() {
  async function getData() {
    const signatures = await connect.getSignaturesForAddress(
      new PublicKey("SysvarC1ock11111111111111111111111111111111"),
      { limit: 1 }
    );
    console.log(signatures);
  }
  getData();
  return <div></div>;
}
