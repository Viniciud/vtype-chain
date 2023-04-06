export declare class Block<T> {
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
export declare class TBlockChain<T> {
    chain: Array<Block<T>>;
    difficulty: number;
    pendingTransactions: Array<T>;
    miningReward: number;
    constructor(difficulty?: number);
    genesisBlock(): Block<T>;
    getLastBlock(): Block<T>;
    generateBlock(data: T): boolean;
    isValid(): boolean;
}
