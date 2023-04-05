import { Block } from "./block";
import { Transaction } from "./transaction";
export declare class Blockchain {
    chain: Array<Block>;
    difficulty: number;
    pendingTransactions: Transaction[];
    miningReward: number;
    constructor();
    genesisBlock(): Block;
    getLastBlock(): Block;
    minePendingTransactions(miningRewardAddress: string): void;
    addTransaction(transaction: Transaction): void;
    getBalanceByAddress(address: string): number;
    getAllTransactionsForWallet(address: string): Array<Transaction>;
    isValid(): boolean;
}
