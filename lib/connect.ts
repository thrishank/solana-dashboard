import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useNetworkStore } from "./network";

let connectionInstance: Connection | null = null;

export function getConnection(): Connection {
    const currentNetwork = useNetworkStore.getState().network;

    if (!connectionInstance || connectionInstance.rpcEndpoint !== clusterApiUrl(currentNetwork)) {
        connectionInstance = new Connection(clusterApiUrl(currentNetwork));
    }

    return connectionInstance;
}

export const connect = new Connection(clusterApiUrl("devnet"));

export function short(str: string, x?: number): string {
    const length = str.length;
    const start = str.substring(0, x ? x : 3);
    const middle = "...";
    const diff = x ? x : 3;
    const end = str.substring(length - diff, length)
    return start + middle + end;
}


type TokenTransfer = {
    fromUserAccount: string;
    toUserAccount: string;
    amount: number;
};

type AccountData = {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: any[];
};

type Instruction = {
    accounts: string[];
    data: string;
    programId: string;
    innerInstructions: Instruction[];
};

export type Transaction = {
    description: string;
    type: string;
    source: string;
    fee: number;
    feePayer: string;
    signature: string;
    slot: number;
    timestamp: number;
    tokenTransfers: any[];
    nativeTransfers: TokenTransfer[];
    accountData: AccountData[];
    transactionError: any;
    instructions: Instruction[];
    events: Record<string, unknown>;
};

export function getReadableTimeDifference(timestamp: number) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const differenceInSeconds = currentTimestamp - timestamp;

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;

    if (differenceInSeconds < secondsInMinute) {
        return differenceInSeconds === 1 ? "1 second" : `${differenceInSeconds} seconds`;
    } else if (differenceInSeconds < secondsInHour) {
        const minutes = Math.floor(differenceInSeconds / secondsInMinute);
        return minutes === 1 ? "1 minute" : `${minutes} minutes`;
    } else if (differenceInSeconds < secondsInDay) {
        const hours = Math.floor(differenceInSeconds / secondsInHour);
        return hours === 1 ? "1 hour" : `${hours} hours`;
    } else {
        const days = Math.floor(differenceInSeconds / secondsInDay);
        return days === 1 ? "1 day" : `${days} days`;
    }
}

export function ReadableTime(timestamp: number) {
    const date: Date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds

    const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
    };

    // Format the date
    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
        "en-US",
        options
    );
    const dateParts: Intl.DateTimeFormatPart[] = formatter.formatToParts(date);

    const formattedDate: string = `${dateParts.find((part) => part.type === "month")?.value
        } ${dateParts.find((part) => part.type === "day")?.value}, ${dateParts.find((part) => part.type === "year")?.value
        } at ${dateParts.find((part) => part.type === "hour")?.value}:${dateParts.find((part) => part.type === "minute")?.value
        }:${dateParts.find((part) => part.type === "second")?.value
        } IST`;

    return formattedDate;
}


export const formatter = new Intl.NumberFormat("en", { notation: "standard" });