export declare class TBlock<T> {
    data: T;
    index: number;
    timestamp: number;
    previousHash: string;
    hash: string;
    nonce: number;
    constructor(data: T, index: number, timestamp: number, previousHash: string);
    calculateHash(): string;
    mineBlock(difficulty: number): void;
    private calculateHashWithNonce;
}
