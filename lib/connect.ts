import { clusterApiUrl, Connection } from "@solana/web3.js";

// export const connect = new Connection("http://127.0.0.1:8899");
export const connect = new Connection(clusterApiUrl("devnet"))
