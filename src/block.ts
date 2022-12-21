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

  calculateHash() {
    return sha256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
  
  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}