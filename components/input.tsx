"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { PublicKey } from "@solana/web3.js";
import { useRouter } from "next/navigation";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [value, setValue] = React.useState("");
    const router = useRouter();

    const handleSearch = () => {
      if (!value.trim()) return;

      try {
        new PublicKey(value);
        router.push(`/address/${value}`);
        setValue("");
      } catch (err) {
        // If it's not a valid public key, assume it's a transaction ID
        router.push(`/tx/${value}`);
        setValue("");
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    };

    return (
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        placeholder="Search by address or tx"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
