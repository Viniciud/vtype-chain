import { Block } from "./Block";
import { Transaction } from "./Transaction";
export declare class Blockchain {
    chain: Block[];
    difficulty: number;
    pendingTransactions: Transaction[];
    miningReward: number;
    constructor(difficult?: number);
    createGenesisBlock(): Block;
    getLastBlock(): Block;
    minePendingTransactions(miningRewardAddress: string): void;
    addTransaction(transaction: Transaction): void;
    getBalanceByAddress(address: string): number;
    getTransactionsByWallet(address: string): Transaction[];
    validChain(): boolean;
}
