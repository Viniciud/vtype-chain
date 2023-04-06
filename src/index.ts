import { TBlockchain } from './TBlockchain/TBlockchain';
import { TBlock } from './TBlockchain/TBlock';

import { Block } from "./Blockchain/block";
import { Blockchain } from "./Blockchain/blockchain";
import { Transaction } from "./Blockchain/transaction";

export default class Typechain<T> extends TBlockchain<T> {}
export class TypechainBlock<T> extends TBlock<T> {}

export class TypecoinChain extends Blockchain {}
export class TypecoinTrx extends Transaction {}
export class TypecoinBlock extends Block {}