"use client";
import { SearchIcon, Menu } from "lucide-react";
import { Input } from "../input";
import Link from "next/link";
import { ModeToggle } from "../theme-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useNetworkStore } from "@/lib/network";
import { useState } from "react";

export default function Navbar() {
  const { network, setNetwork } = useNetworkStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-[#1E1E1E] py-4 px-6 border-b border-[#e5e5e5] dark:border-[#282828] shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
          <h1>
            <Link href="/" className="text-2xl font-bold text-[#6366f1] whitespace-nowrap">
              Solana Explorer
            </Link>
          </h1>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center justify-center w-full gap-4`}
        >
          <div className="relative w-full md:w-[500px] max-w-2xl">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
            <Input
              type="text"
              placeholder="Search accounts, tx, blocks"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1]"
            />
          </div>
        </div>

        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex items-center gap-4 mt-4 md:mt-0`}
        >
          <div className="w-full md:w-44">
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="devnet">Devnet</SelectItem>
                <SelectItem value="testnet">Testnet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
