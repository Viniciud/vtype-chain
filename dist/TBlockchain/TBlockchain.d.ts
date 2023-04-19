import { TBlock } from "./TBlock";
export declare class TBlockchain {
    chain: Array<any>;
    difficulty: number;
    pendingTransactions: Array<any>;
    miningReward: number;
    constructor(difficulty?: number);
    genesisBlock(): TBlock;
    getLastBlock(): TBlock;
    generateBlock(data: any): boolean;
    isValid(): boolean;
}
