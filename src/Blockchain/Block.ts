import { Transaction } from './Transaction';
import sha256 from 'crypto-js/sha256';

export class Block {
  previousHash: string;
  timestamp: number;
  transactions: Transaction[];
  nonce = 0;
  hash = this.calculateHash();

  constructor(timestamp: number, transactions: Transaction[], previousHash: string = '') {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(nonce = this.nonce): string {
    return sha256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + nonce).toString();
  }

  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join('0');
    let nonce = 0;
    let hash = this.calculateHash();

    while (hash.substring(0, difficulty) !== target) {
      nonce++;
      hash = this.calculateHash(nonce);
    }

    this.nonce = nonce;
    this.hash = hash;
    console.log(`Block mined: ${this.hash}`);
  }

  validTransactions(): boolean {
    for (const transaction of this.transactions) {
      if (!transaction.isValid()) {
        return false;
      }
    }
    return true;
  }
}