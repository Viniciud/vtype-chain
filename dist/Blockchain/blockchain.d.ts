import { Block } from "./Block";
import { Transaction } from "./Transaction";
export declare class Blockchain {
    chain: Array<Block>;
    difficulty: number;
    pendingTransactions: Transaction[];
    miningReward: number;
    constructor(difficulty?: number);
    genesisBlock(): Block;
    getLastBlock(): Block;
    minePendingTransactions(miningRewardAddress: string): void;
    addTransaction(transaction: Transaction): void;
    getBalanceByAddress(address: string): number;
    getAllTransactionsForWallet(address: string): Array<Transaction>;
    isValid(): boolean;
}
