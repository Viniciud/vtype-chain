import { Transaction } from './transaction';
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

  calculateHash(): string {
    return sha256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
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
  
  calculateHashWithNonce(nonce: number): string {
    return sha256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + nonce).toString();
  }
  
  hasValidTransactions(): boolean {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}