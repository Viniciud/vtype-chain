import { TBlock } from "./TBlock";
export declare class TBlockchain<T> {
    chain: Array<TBlock<T>>;
    difficulty: number;
    pendingTransactions: Array<T>;
    miningReward: number;
    constructor(difficulty?: number);
    genesisBlock(): TBlock<T>;
    getLastBlock(): TBlock<T>;
    generateBlock(data: T): boolean;
    isValid(): boolean;
}
