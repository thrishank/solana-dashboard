"use client";

import { ActivityIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../HomeCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Network() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("");
  });

  return (
    <div>
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-[#374151] font-bold">
            Network Overview
          </CardTitle>
          <ActivityIcon className="w-6 h-6 text-[#6b7280]" />
        </CardHeader>
      </Card>
    </div>
  );
}
