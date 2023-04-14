import sha256 from 'crypto-js/sha256';

export class TBlock<T> {
    hash: string;
    nonce: number;

    constructor(
        public index: number,
        public timestamp: number,
        public previousHash: string,
        public data: any,
    ) {
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(): string {
        const data = this.index + this.timestamp + JSON.stringify(this.data) + this.nonce + this.previousHash;
        return sha256(data).toString();
    }

    mineBlock(difficulty: number): void {
        const target = Array(difficulty + 1).join('0');
        let nonce = 0;
        let hash = this.calculateHash();

        while (hash.substring(0, difficulty) !== target) {
            nonce++;
            hash = this.calculateHashWithNonce(nonce);
        }
        this.nonce = nonce;
        this.hash = hash;
        console.log(`Block mined: ${this.hash}`);
    }

    private calculateHashWithNonce(nonce: number): string {
        return sha256(this.index + this.timestamp + JSON.stringify(this.data) + nonce + this.previousHash).toString();
    }
}