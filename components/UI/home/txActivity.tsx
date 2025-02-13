"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/HomeCard";
import { getConnection } from "@/lib/connect";
import { ActivityIcon } from "lucide-react";

interface dataType {
  month: string;
  activity: number;
}
export default function TransactionActivity() {
  const [data, setData] = useState<dataType[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const recentPerformanceSamples =
          await getConnection().getRecentPerformanceSamples(6);

        const currentDate = new Date();
        const formattedData = recentPerformanceSamples
          .map((sample, index) => {
            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - index,
              1
            );
            return {
              month: date.toLocaleString("default", { month: "short" }),
              activity: sample.numTransactions,
            };
          })
          .reverse();

        setData(formattedData);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-[#374151] font-bold dark:text-[#FFFFFF]">
          Transaction Activity
        </CardTitle>
        <ActivityIcon className="w-6 h-6 text-[#6b7280]" />
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} className="aspect-[16/9]">
            <XAxis dataKey="month" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="activity"
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
