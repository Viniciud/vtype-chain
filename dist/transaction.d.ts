export declare class Transaction {
    #private;
    constructor(fromAddress: any, toAddress: any, amount: any);
    get fromAddress(): any;
    get toAddress(): any;
    get amount(): any;
    calculateHash(): string;
    signTransaction(signingKey: any): void;
    isValid(): boolean;
}
