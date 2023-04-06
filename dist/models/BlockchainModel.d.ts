import { Transaction } from '../transaction';
export interface BlockHeaderModel {
    nonce: number;
    blockHash: string;
}
export interface PayloadModel {
    sequency: number;
    timestamp: number;
    data: Transaction[];
    previousHash: string;
}
export interface TransactionBaseInterface {
    timestamp: number;
    signature: any;
    calculateHash(): string;
    signTransaction(signingKey: any): void;
    isValid(): boolean;
}
