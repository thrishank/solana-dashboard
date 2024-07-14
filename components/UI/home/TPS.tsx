"use client";
import { getConnection } from "@/lib/connect";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/HomeCard";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ActivityIcon } from "lucide-react";

export default function Charts() {
  const [networkThroughputData, setNetworkThroughputData] = useState([{}]);

  const fetchData = async () => {
    const performance = await getConnection().getRecentPerformanceSamples(6);
    console.log(performance);
    const throughput = performance.map((sample, index) => ({
      x: `Sample ${index + 1}`,
      y: sample.numTransactions / sample.samplePeriodSecs,
    }));
    setNetworkThroughputData(throughput);
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-[#374151] font-bold dark:text-[#FFFFFF]">
          Network ThroughPut (TPS)
        </CardTitle>
        <ActivityIcon className="w-6 h-6 text-[#6b7280]" />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={networkThroughputData}>
            <XAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
