import { Transaction } from './Transaction';
export declare class Block {
    previousHash: string;
    timestamp: number;
    transactions: Transaction[];
    nonce: number;
    hash: string;
    constructor(timestamp: number, transactions: Transaction[], previousHash?: string);
    calculateHash(nonce?: number): string;
    mineBlock(difficulty: number): void;
    validTransactions(): boolean;
}
