import { Block } from "./block";
import { Transaction } from "./transaction";
export declare class Blockchain {
    chain: Block[];
    difficulty: number;
    pendingTransactions: Transaction[];
    miningReward: number;
    constructor();
    createGenesisBlock(): Block;
    getLatestBlock(): Block;
    minePendingTransactions(miningRewardAddress: string): void;
    addTransaction(transaction: Transaction): void;
    getBalanceOfAddress(address: string): number;
    getAllTransactionsForWallet(address: string): any[];
    isChainValid(): boolean;
}
