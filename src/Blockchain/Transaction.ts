import sha256 from 'crypto-js/sha256';

const EC = require('elliptic').ec
const ec = new EC('secp256k1')

export class Transaction {
  fromAddress: string;
  toAddress: string;
  amount: number;
  timestamp: number;
  signature: any = null;

  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = Date.now();
  }

  calculateHash(): string {
    return sha256(this.fromAddress + this.toAddress + this.amount + this.timestamp).toString();
  }

  signTransaction(signingKey: any): void {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('Cannot sign transactions for other wallets.');
    }

    let hashTx = this.calculateHash();
    let sig = signingKey.sign(hashTx, 'base64');

    this.signature = sig.toDER('hex');
  }

  isValid(): boolean {
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error('Transaction has no signature.');
    }

    let publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}