import { Input } from "@/components/input";
import { SearchIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#121212]">
      <div className="w-full max-w-xl p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
          <Input
            type="text"
            placeholder="Enter the Public Key ....."
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1]"
          />
        </div>
      </div>
    </div>
  );
}