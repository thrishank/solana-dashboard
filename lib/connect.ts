import { clusterApiUrl, Connection } from "@solana/web3.js";

export const connect = new Connection(clusterApiUrl("devnet"));
