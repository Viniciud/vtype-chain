import { PayloadModel } from './models/BlockchainModel'
import { hash, checkedHash } from "./utils/helpers.util"
import { Block } from './block'
import { Transaction } from './transaction'

export class Blockchain {
  #chain: Block[] = []
  private pendingTransactions: Transaction[] = []
  private miningReward = 1
  private powPrefix = '0'

  constructor(private readonly difficulty: number = 4) {
    this.#chain.push(this.createGenesisBlock())
  }

  createGenesisBlock(): Block {
    const payload: PayloadModel = {
      sequency: 0,
      timestamp: +new Date(),
      data: [],
      previousHash: ''
    }

    const genesisBlock = new Block(
      {
        nonce: 0,
        blockHash: hash(JSON.stringify(payload))
      },
      payload
    )

    return genesisBlock
  }

  get chain(): Block[] {
    return this.#chain
  }

  private get lastBlock(): Block {
    if (this.chain.length != 1) return this.chain[this.chain.length - 2] as Block

    return this.chain[0] as Block
  }

  private lastBlockHash(): string {
    console.log('LasBlockHash ', this.lastBlock.header.blockHash)
    return this.lastBlock.header.blockHash
  }

  minePendingTransactions(miningRewardAddress: string) {
    const rewardTx = new Transaction('system', miningRewardAddress, this.miningReward)
    this.pendingTransactions.push(rewardTx)

    const block = this.createBlock(this.pendingTransactions)

    const mineInfo = this.mineBlock(block)

    console.log(`Block successfully mined!`)
    console.log('Bloco ', mineInfo.minedBlock)
    for (const b of block.data) {
      console.log('Transactions ', b)
    }
    this.sendBlock(mineInfo.minedBlock)

    this.pendingTransactions = []
  }

  async addTransaction(transaction: Transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Transaction must include from and to adress!')
    }

    if (!transaction.isValid()) {
      console.log('addTransaction')
      throw new Error('Cannot add invalid transaction to chain!')
    } else {
      console.log('ENTROU AQUI POR ALGUM MOTIVO')
      this.pendingTransactions.push(transaction)
    }
  }

  getBalanceOfAddress(address: any) {
    let balance = 0

    for (const block of this.#chain) {
      for (const trans of block.payload.data) {
        if (trans.fromAddress === address) {
          console.log('BLOCK ', block)
          console.log('TRANSACTIONS ', trans)
          console.log('->')
          balance -= trans.amount
          console.log('------------------')
        }
        if (trans.toAddress === address) {
          console.log('BLOCK ', block)
          console.log('TRANSACTIONS ', trans)
          console.log('->')
          balance += trans.amount
          console.log('------------------')
        }
      }
    }

    return balance
  }

  createBlock(data: Transaction[]): PayloadModel {
    const newBlock: PayloadModel = {
      sequency: this.lastBlock.payload.sequency + 1,
      timestamp: +new Date(),
      data,
      previousHash: this.lastBlockHash()
    }

    console.log(`Block #${newBlock.sequency} created: ${JSON.stringify(newBlock)}`)
    return newBlock
  }

  mineBlock(block: PayloadModel): any {
    let nonce: number = 0
    const begin: number = +new Date()

    while (true) {
      const blockHash: string = hash(JSON.stringify(block))
      const hashPow: string = hash(blockHash + nonce)
      if (
        checkedHash({
          hash: hashPow,
          difficulty: this.difficulty,
          prefix: this.powPrefix
        })
      ) {
        const final: number = +new Date()
        const reducedHash: string = blockHash.slice(0, 12)
        const miningTime: number = (final - begin) / 1000

        console.log(`Block #${block.sequency} mined in ${miningTime}s. Hash ${reducedHash} (${nonce} attempts)`)

        return {
          minedBlock: {
            payload: { ...block },
            header: {
              nonce,
              blockHash
            }
          }
        }
      }
      nonce++
    }
  }

  checkBlockTransactions(block: Block) {
    for (const tx of block.payload.data) {
      if (!tx.isValid()) {
        return false
      }
    }
    return true
  }

  checkBlock(block: Block): boolean {
    if (!this.checkBlockTransactions(block)) {
      console.log('checkBlock')
      return false
    }
    console.log('BLOCK checkBLock ', block)
    console.log('BLOCK last  ', this.lastBlock)
    // console.log('BLOCK checkBLock data ', block.payload.data)
    if (block.payload.previousHash != this.lastBlockHash()) {
      console.error(
        `Block #${block.payload.sequency} it's ${this.lastBlockHash().slice(
          0,
          12
        )} indeed ${block.payload.previousHash.slice(0, 12)}`
      )
      return false
    }

    const hashTest: string = hash(hash(JSON.stringify(block.payload)) + block.header.nonce)

    if (!checkedHash({ hash: hashTest, difficulty: this.difficulty, prefix: this.powPrefix })) {
      console.error(
        `Block #${block.payload.sequency} it's invalid! Nonce ${block.header.nonce} it's invalid and can't be checked!`
      )
      return false
    }

    return true
  }

  sendBlock(block: Block): Block[] {
    if (this.checkBlock(block)) {
      this.#chain.push(block)
      console.log(`Block #${block.payload.sequency} has been added into blockchain: ${JSON.stringify(block, null, 2)}`)
    }
    console.log('FULL CHAIN ', this.#chain)
    return this.#chain
  }
}
