export declare class TBlock {
    index: number;
    timestamp: number;
    previousHash: string;
    data: any;
    hash: string;
    nonce: number;
    constructor(index: number, timestamp: number, previousHash: string, data: any);
    calculateHash(): string;
    mineBlock(difficulty: number): void;
    private calculateHashWithNonce;
}
