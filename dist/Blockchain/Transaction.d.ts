export declare class Transaction {
    fromAddress: string;
    toAddress: string;
    amount: number;
    timestamp: number;
    signature: any;
    constructor(fromAddress: string, toAddress: string, amount: number);
    calculateHash(): string;
    signTransaction(signingKey: any): void;
    isValid(): boolean;
}
