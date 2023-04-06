import { TBlockchain } from './TBlockchain/TBlockchain';
import { TBlock } from './TBlockchain/TBlock';
import { Block } from "./Blockchain/block";
import { Blockchain } from "./Blockchain/blockchain";
import { Transaction } from "./Blockchain/transaction";
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
