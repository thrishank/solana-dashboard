"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/HomeCard";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/button";
import { Select } from "@/components/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

interface PriceData {
  timestamp: number;
  price: number;
}

const timeFrames = [
  { value: "1", label: "1 Day" },
  { value: "7", label: "1 Week" },
  { value: "30", label: "1 Month" },
  { value: "90", label: "3 Months" },
  { value: "365", label: "1 Year" },
];

const SolanaPriceCard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState("1");
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPriceData = async (selectedTimeFrame: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=${selectedTimeFrame}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const formattedData: PriceData[] = data.prices.map(
        ([timestamp, price]: [number, number]) => ({
          timestamp,
          price,
        })
      );
      setPriceData(formattedData);
    } catch (err) {
      setError("Error fetching price data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPriceData(timeFrame);
  }, [timeFrame]);

  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value);
  };

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-[#374151] font-bold">
          Solana Price Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(timestamp) =>
                      new Date(timestamp).toLocaleDateString()
                    }
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) =>
                      new Date(Number(label)).toLocaleString()
                    }
                    formatter={(value: number) => [
                      `$${value.toFixed(2)}`,
                      "Price",
                    ]}
                  />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <Select onValueChange={handleTimeFrameChange} value={timeFrame}>
                  <SelectTrigger className="w-full sm:w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Select time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeFrames.map((tf) => (
                      <SelectItem
                        key={tf.value}
                        value={tf.value}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {tf.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => fetchPriceData(timeFrame)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SolanaPriceCard;
