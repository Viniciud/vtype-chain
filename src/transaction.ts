import { createHash } from 'crypto'

const EC = require('elliptic').ec
const ec = new EC('secp256k1')

export class Transaction {
  #fromAddress: any
  #toAddress: any
  #amount: any
  #signature: any = null
  #transactionHash: string

  constructor(fromAddress: any, toAddress: any, amount: any) {
    this.#fromAddress = fromAddress
    this.#toAddress = toAddress
    this.#amount = amount
    this.#transactionHash = this.calculateHash()
  }

  get fromAddress(): any {
    return this.#fromAddress
  }
  get toAddress(): any {
    return this.#toAddress
  }
  get amount(): any {
    return this.#amount
  }

  calculateHash() {
    return createHash('sha256')
      .update(this.#fromAddress + this.#toAddress + this.#amount)
      .digest('hex')
      .toString()
  }

  signTransaction(signingKey: any) {
    if (signingKey.getPublic('hex') !== this.#fromAddress) {
      throw new Error('You cannot sign transaction for other wallets!')
    }

    const hashTx = this.calculateHash()
    const sig = signingKey.sign(hashTx, 'base64')
    this.#signature = sig.toDER('hex')
  }

  isValid(): boolean {
    console.log('SIGNATURE ', this.#signature)
    console.log('FROMADDRESS ', this.#fromAddress)
    if (this.#fromAddress === 'system') return true

    if (this.#signature === null && this.#fromAddress !== 'system') return false

    if (this.#signature == null || this.#signature.length === 0) {
      return false
    }
    if (this.calculateHash() != this.#transactionHash) {
      console.log('HASH diferente ')
      return false
    }

    const publicKey = ec.keyFromPublic(this.#fromAddress, 'hex')
    console.log('IS VALID ', publicKey.verify(this.calculateHash(), this.#signature))
    return publicKey.verify(this.calculateHash(), this.#signature)
  }
}
