import { TransactionBaseInterface } from './models/BlockchainModel';
export declare class TransactionBase implements TransactionBaseInterface {
    data: any;
    timestamp: number;
    signature: any;
    constructor(data: any);
    calculateHash(): string;
    signTransaction(signingKey: any): void;
    isValid(): boolean;
}
