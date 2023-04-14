import { TBlockchain } from './TBlockchain/TBlockchain';
import { TBlock } from './TBlockchain/TBlock';
import { Block } from "./Blockchain/Block";
import { Blockchain } from "./Blockchain/Blockchain";
import { Transaction } from "./Blockchain/Transaction";
export default class Typechain<T> extends TBlockchain<T> {
}
export declare class TypechainBlock<T> extends TBlock<T> {
}
export declare class TypecoinChain extends Blockchain {
}
export declare class TypecoinTrx extends Transaction {
}
export declare class TypecoinBlock extends Block {
}
