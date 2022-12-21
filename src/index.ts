
import { Block } from './block';
import { Blockchain } from './blockchain'

import { Transaction } from './transaction'

export default class Typecoin extends Blockchain {}
export interface TypecoinTx extends Transaction {}
export class TypecoinBlock extends Block {}

// // export default Typecoin;
// const EC = require('elliptic').ec
// const ec = new EC('secp256k1')

// const myKey = ec.keyFromPrivate('bd3e75e93dd25377c806c3dae74bfc9116402827b617d2d774e099be51cd2417')
// const myWalletAddress = myKey.getPublic('hex');

// // Create new instance of Blockchain class
// const typecoin = new Blockchain();

// // Mine first block
// typecoin.minePendingTransactions(myWalletAddress);

// // Create a transaction & sign it with your key
// const tx1 = new Transaction(myWalletAddress, 'address2', 100);
// tx1.signTransaction(myKey);
// typecoin.addTransaction(tx1);

// // Mine block
// typecoin.minePendingTransactions(myWalletAddress);

// // Create second transaction
// const tx2 = new Transaction(myWalletAddress, 'address1', 50);
// tx2.signTransaction(myKey);
// typecoin.addTransaction(tx2);

// // Mine block
// typecoin.minePendingTransactions(myWalletAddress);

// console.log();
// console.log(
//   `Balance of V is ${typecoin.getBalanceOfAddress(myWalletAddress)}`
// );

// // Uncomment this line if you want to test tampering with the chain
// typecoin.chain[1].transactions[0].amount = 10;

// // Check if the chain is valid
// console.log();
// console.log('Blockchain valid?', typecoin.isChainValid() ? 'Yes' : 'No');
