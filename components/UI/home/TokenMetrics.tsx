"use client";

import { useState, useEffect } from "react";
import { DollarSignIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/HomeCard";
import { getConnection } from "@/lib/connect";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from "axios";

interface TokenData {
  circulatingSupply: string;
  totalSupply: string;
  SOL_PRICE: string;
  SOL_CAP: string;
  allTimeHigh: string;
  priceChange24h: string;
}

interface CoinGeckoResponse {
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    ath: { usd: number };
    price_change_percentage_24h: number;
  };
}

async function getData(): Promise<TokenData> {
  const formatter = new Intl.NumberFormat("en", { notation: "compact" });

  try {
    const supply = await getConnection().getSupply();

    const circulatingSupply = formatter.format(
      supply.value.circulating / LAMPORTS_PER_SOL
    );
    const totalSupply = formatter.format(
      (supply.value.nonCirculating + supply.value.circulating) /
        LAMPORTS_PER_SOL
    );

    const cgResponse = await axios.get<CoinGeckoResponse>(
      "https://api.coingecko.com/api/v3/coins/solana"
    );
    const data = cgResponse.data;

    const SOL_PRICE = data.market_data.current_price.usd.toFixed(2);
    const SOL_CAP = formatter.format(data.market_data.market_cap.usd);
    const allTimeHigh = data.market_data.ath.usd.toFixed(2);
    const priceChange24h =
      data.market_data.price_change_percentage_24h.toFixed(2) + "%";

    return {
      circulatingSupply,
      totalSupply,
      SOL_PRICE,
      SOL_CAP,
      allTimeHigh,
      priceChange24h,
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
}

export default function Token(): JSX.Element {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = () => {
      getData()
        .then((data) => {
          setTokenData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (!tokenData) return <div>No data available</div>;

  const {
    circulatingSupply,
    totalSupply,
    SOL_PRICE,
    SOL_CAP,
    allTimeHigh,
    priceChange24h,
  } = tokenData;

  return (
    <div>
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-[#374151] dark:text-[#FFFFFF] font-bold">
            Token Metrics
          </CardTitle>
          <DollarSignIcon className="w-6 h-6 text-muted-foreground dark:text-white" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {SOL_PRICE && (
              <Component name="SOL Price" count={`$${SOL_PRICE}`} />
            )}
            {SOL_CAP && <Component name="Market Cap (USD)" count={SOL_CAP} />}
            {circulatingSupply && (
              <Component name="Circulating Supply" count={circulatingSupply} />
            )}
            {totalSupply && (
              <Component name="Total Supply" count={totalSupply} />
            )}
            {allTimeHigh && (
              <Component name="All Time High" count={`$${allTimeHigh}`} />
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

interface ComponentProps {
  count: string;
  name: string;
}

function Component({ count, name }: ComponentProps): JSX.Element {
  return (
    <div className="flex flex-col items-start gap-1 ">
      <div className="text-[#6b7280] dark:text-[#B0B0B0]">{name}</div>
      <div className="font-bold text-[#374151] dark:text-[#B0B0B0] text-sm sm:text-2xl">
        {count}
      </div>
    </div>
  );
}
