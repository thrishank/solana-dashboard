import { SearchIcon } from "lucide-react";

import { Button } from "../button";
import { Input } from "../input";
import Link from "next/link";
import { ModeToggle } from "../theme-button";

export default function Navbar() {
  return (
    <header className="bg-[#fff] dark:bg-[#1E1E1E] py-4 px-6 border-b border-[#e5e5e5] dark:border-[#282828] shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="pr-20">
            <Link href="/" className="text-2xl font-bold text-[#6366f1]">
              Solana Explorer
            </Link>
          </h1>
          <nav className="hidden md:flex items-center gap-8 text-[#6b7280]">
            <Link href="/tx" className="hover:text-[#374151]">
              <div>Transactions</div>
            </Link>
            <Link href="/address" className="hover:text-[#374151]">
              <div>Accounts</div>
            </Link>
            <Link href="/blocks" className="hover:text-[#374151]">
              Blocks
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 px-4 w-full max-w-xl">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
            <Input
              type="text"
              placeholder="Search for blocks, accounts, transactions, and tokens"
              className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1]"
            />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
