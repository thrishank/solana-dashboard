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
    <header className="bg-[#fff] dark:bg-[#1E1E1E] py-4 px-6 border-b border-[#e5e5e5] dark:border-[#282828] shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
          <h1>
            <Link href="/" className="text-2xl font-bold text-[#6366f1]">
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

        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center gap-4 md:gap-8 text-gray-300 w-full md:w-auto`}
        >
          <Link href="/tx" className="hover:text-white w-full md:w-auto">
            <div>Transactions</div>
          </Link>
          <Link href="/address" className="hover:text-white w-full md:w-auto">
            <div>Accounts</div>
          </Link>
          <Link href="/block" className="hover:text-white w-full md:w-auto">
            Blocks
          </Link>
        </nav>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
          <div className="w-full md:w-[180px] mb-4 md:mb-0">
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
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
            <Input
              type="text"
              placeholder="Search accounts, tx, blocks"
              className="w-full md:w-[200px] pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1]"
            />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
