import { Block } from "./Block";
import { Transaction } from "./Transaction";

export class Blockchain {
  chain: Array<Block>;
  difficulty: number;
  pendingTransactions: Transaction[];
  miningReward: number;

  constructor(params: any) {
    this.chain = [this.genesisBlock()];
    this.difficulty = params?.difficulty ? params?.difficulty : 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  genesisBlock(): Block {
    return new Block(Date.now(), [], '0');
  }

  getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string): void {
    let rewardTx = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTx);

    let block = new Block(
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
      throw new Error('Missing (from address) or (to address) in the transaction.');
    }

    if (!transaction.isValid()) {
      throw new Error('Invalid transaction');
    }

    if (transaction.amount <= 0) {
      throw new Error('Transaction amount should not to be 0.');
    }

    let walletBalance = this.getBalanceByAddress(transaction.fromAddress);

    if (walletBalance < transaction.amount) {
      throw new Error('Not enough balance');
    }

    let pendingTrxForWallet = this.pendingTransactions.filter(
      trx => trx.fromAddress === transaction.fromAddress
    );

    if (pendingTrxForWallet.length > 0) {
      let totalPendingAmount = pendingTrxForWallet
        .map(trx => trx.amount)
        .reduce((prev, curr) => prev + curr);

      let totalAmount = totalPendingAmount + transaction.amount;
      if (totalAmount > walletBalance) {
        throw new Error('Pending transactions for this wallet is higher than its balance.');
      }
    }

    this.pendingTransactions.push(transaction);
  }

  getBalanceByAddress(address: string): number {
    let balance = 0;

    for (let block of this.chain) {
      for (let transaction of block.transactions) {
        if (transaction.fromAddress === address)
          balance -= transaction.amount;

        if (transaction.toAddress === address)
          balance += transaction.amount;
      }
    }

    return balance;
  }

  getAllTransactionsForWallet(address: string): Array<Transaction> {
    let transactions = [];

    for (let block of this.chain) {
      for (let trx of block.transactions) {
        if (trx.fromAddress === address || trx.toAddress === address) {
          transactions.push(trx);
        }
      }
    }

    return transactions;
  }

  isValid(): boolean {
    if (JSON.stringify(this.genesisBlock()) !== JSON.stringify(this.chain[0])) return false;

    for (let i = 1; i < this.chain.length; i++) {
      let currentBlock = this.chain[i];
      let previousBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) return false;

      if (currentBlock.hash !== currentBlock.calculateHash()) return false;

      if (previousBlock.hash !== currentBlock.previousHash) return false;
    }
    return true;
  }
}