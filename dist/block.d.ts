import { Transaction } from './transaction';
export declare class Block {
    previousHash: string;
    timestamp: number;
    transactions: Transaction[];
    nonce: number;
    hash: any;
    constructor(timestamp: number, transactions: Transaction[], previousHash?: string);
    calculateHash(): any;
    mineBlock(difficulty: number): void;
    hasValidTransactions(): boolean;
}
