import { Block } from './block';
import { Blockchain } from './blockchain';
import { Transaction } from './transaction';
export default class Typecoin extends Blockchain {
}
export interface TypecoinTx extends Transaction {
}
export declare class TypecoinBlock extends Block {
}
