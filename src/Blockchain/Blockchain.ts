import { Block } from "./Block";
import { Transaction } from "./Transaction";

export class Blockchain {
  chain: Block[];
  difficulty: number;
  pendingTransactions: Transaction[];
  miningReward: number;

  constructor(difficult: number = 4) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficult;
    this.pendingTransactions = new Array<any>();
    this.miningReward = 100;
  }

  createGenesisBlock(): Block {
    return new Block(Date.now(), [], '0');
  }

  getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string): void {
    const rewardTr = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTr);

    const block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLastBlock().hash
    );
    block.mineBlock(this.difficulty);

    this.chain.push(block);

    this.pendingTransactions = [];
  }

  addTransaction(transaction: Transaction): void {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Missing (from address) or (to address).');
    }

    if (!transaction.isValid()) {
      throw new Error('Cannot add invalid transaction.');
    }

    if (transaction.amount <= 0) {
      throw new Error('Transaction amount do not be 0.');
    }

    const walletBalance = this.getBalanceByAddress(transaction.fromAddress);
    if (walletBalance < transaction.amount) {
      throw new Error('Balance is not enough.');
    }

    const pendingTrForWallet = this.pendingTransactions.filter(
      tr => tr.fromAddress === transaction.fromAddress
    );

    if (pendingTrForWallet.length > 0) {
      const totalPendingAmount = pendingTrForWallet
        .map(tr => tr.amount)
        .reduce((prev, curr) => prev + curr);

      const totalAmount = totalPendingAmount + transaction.amount;
      if (totalAmount > walletBalance) {
        throw new Error(
          'Pending transactions for this wallet is higher than its balance.'
        );
      }
    }

    this.pendingTransactions.push(transaction);
  }

  getBalanceByAddress(address: string): number {
    let balance = 0;

    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }

        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }

    return balance;
  }

  getTransactionsByWallet(address: string): Transaction[] {
    const transactions = [];

    for (const block of this.chain) {
      for (const tr of block.transactions) {
        if (tr.fromAddress === address || tr.toAddress === address) {
          transactions.push(tr);
        }
      }
    }

    return transactions;
  }

  validChain(): boolean {
    const genesisBlock = JSON.stringify(this.createGenesisBlock());

    if (genesisBlock !== JSON.stringify(this.chain[0])) {
      return false;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }

      if (!currentBlock.validTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}