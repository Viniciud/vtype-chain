import { TBlockChain } from './TBlockchain/TBlockchain';
import { Blockchain } from './Blockchain/blockchain';
import { Transaction } from './Blockchain/transaction';
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const myKey = ec.keyFromPrivate(
    '7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf'
);

const myWalletAddress = myKey.getPublic('hex');

// import { Block } from './block';
// import { Blockchain } from './blockchain'

// import { Transaction } from './transaction'

// export default class Typecoin extends Blockchain {}
// export interface TypecoinTx extends Transaction {}
// export class TypecoinBlock extends Block {}

interface Suprimentos {
    local: string;
    data: string;
    remetente: string;
    destinatario: string;
}

const sup1: Suprimentos = {
    local: 'Três Corações',
    data: new Date().toISOString(),
    remetente: 'BH transporter',
    destinatario: 'Centro de Distribuição Nanico Bufador'
}

console.log(sup1);

const blockchain = new TBlockChain<Suprimentos>();
const bchain = new TBlockChain();
const typecoin = new Blockchain(8);

typecoin.minePendingTransactions(myWalletAddress);

const tx1 = new Transaction(myWalletAddress, "myWalletAddress", 10);
tx1.signTransaction(myKey)
typecoin.addTransaction(tx1);

// Mine block
typecoin.minePendingTransactions(myWalletAddress);

bchain.generateBlock(sup1)

blockchain.generateBlock(sup1)

console.log('BCHAIN', bchain);
console.log('GENERIC CHAIN', blockchain)
console.log('TYPECOIN', typecoin)