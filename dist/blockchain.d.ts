import { PayloadModel } from './models/BlockchainModel';
import { Block } from './block';
import { Transaction } from './transaction';
export declare class Blockchain {
    #private;
    private readonly difficulty;
    private pendingTransactions;
    private miningReward;
    private powPrefix;
    constructor(difficulty?: number);
    createGenesisBlock(): Block;
    get chain(): Block[];
    private get lastBlock();
    private lastBlockHash;
    minePendingTransactions(miningRewardAddress: string): void;
    addTransaction(transaction: Transaction): Promise<void>;
    getBalanceOfAddress(address: any): number;
    createBlock(data: Transaction[]): PayloadModel;
    mineBlock(block: PayloadModel): any;
    checkBlockTransactions(block: Block): boolean;
    checkBlock(block: Block): boolean;
    sendBlock(block: Block): Block[];
}
