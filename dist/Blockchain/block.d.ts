import { Transaction } from './Transaction';
export declare class Block {
    previousHash: string;
    timestamp: number;
    transactions: Transaction[];
    nonce: number;
    hash: string;
    constructor(timestamp: number, transactions: Transaction[], previousHash?: string);
    calculateHash(): string;
    mineBlock(difficulty: number): void;
    calculateHashWithNonce(nonce: number): string;
    hasValidTransactions(): boolean;
}
