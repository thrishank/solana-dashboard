import { ActivityIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../HomeCard";
import { connect } from "@/lib/connect";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from "axios";

async function getData() {
  const formatter = new Intl.NumberFormat("en", { notation: "compact" });

  try {
    const supply = await connect.getSupply();

    const circulatingSupply = formatter.format(
      supply.value.circulating / LAMPORTS_PER_SOL
    );
    const totalSuppy = formatter.format(
      (supply.value.nonCirculating + supply.value.circulating) /
        LAMPORTS_PER_SOL
    );

    const cgResponse = await axios.get(
      "https://api.coingecko.com/api/v3/coins/solana"
    );
    const data = cgResponse.data;

    const SOL_PRICE = data.market_data.current_price.usd;
    const SOL_CAP = formatter.format(data.market_data.market_cap.usd);
    const allTimeHigh = data.market_data.ath.usd;
    const priceChange24h = data.market_data.price_change_percentage_24h;
    
    return {
      circulatingSupply,
      totalSuppy,
      SOL_PRICE,
      SOL_CAP,
      allTimeHigh,
      priceChange24h,
    };
  } catch (err) {
    console.log(err);
    return {};
  }
}

export default async function Token() {
  const {
    circulatingSupply,
    totalSuppy,
    SOL_PRICE,
    SOL_CAP,
    allTimeHigh,
    priceChange24h,
  } = await getData();
  return (
    <div>
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-[#374151] font-bold">
            Token Metrics
          </CardTitle>
          <ActivityIcon className="w-6 h-6 text-[#6b7280]" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {SOL_PRICE && <Component name="SOL Price" count={SOL_PRICE} />}
            {SOL_CAP && <Component name="Market Cap" count={SOL_CAP} />}
            {circulatingSupply && (
              <Component name="Circulating Supply" count={circulatingSupply} />
            )}
            {totalSuppy && <Component name="Total Supply" count={totalSuppy} />}
            {allTimeHigh && (
              <Component name="All Time High" count={allTimeHigh} />
            )}
            {priceChange24h && (
              <Component name="Change in 24h" count={priceChange24h} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Component({ count, name }: { count: string; name: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="text-[#6b7280]">{name}</div>
      <div className="text-2xl font-bold text-[#374151]">{count}</div>
    </div>
  );
}
