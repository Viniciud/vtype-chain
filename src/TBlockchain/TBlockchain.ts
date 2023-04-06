import { TBlock } from "./TBlock";

export class TBlockchain<T> {
    chain: Array<TBlock<T>>;
    difficulty: number;
    pendingTransactions: Array<T>;
    miningReward: number;

    constructor(difficulty: number = 4) {
        this.chain = [this.genesisBlock()];
        this.difficulty = difficulty ?? 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    genesisBlock(): TBlock<T> {
        return new TBlock<T>(null, 0, 0, '');
    }

    getLastBlock(): TBlock<T> {
        return this.chain[this.chain.length - 1];
    }

    generateBlock(data: T): boolean {
        let nextIndex = this.getLastBlock().index + 1;
        let nextTimestamp = new Date().getTime() / 1000;
        let previousHash = this.getLastBlock().hash;

        const nextBlock = new TBlock<T>(data, nextIndex, nextTimestamp, previousHash);
        nextBlock.mineBlock(this.difficulty);

        if (this.isValid()) {
            this.chain.push(nextBlock);
            return true;
        }
        else {
            return false;
        }
    }

    isValid(): boolean {
        if (JSON.stringify(this.genesisBlock()) !== JSON.stringify(this.chain[0])) {
            return false;
        }

        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (previousBlock.hash !== currentBlock.previousHash) {
                return false;
            }
        }
        return true;
    }
}