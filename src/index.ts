import { TBlockchain } from './TBlockchain/TBlockchain';
import { TBlock } from './TBlockchain/TBlock';

import { Block } from "./Blockchain/Block";
import { Blockchain } from "./Blockchain/Blockchain";
import { Transaction } from "./Blockchain/Transaction";

export class Typechain extends TBlockchain {}
export class TypechainBlock extends TBlock {}

export default class Typecoin extends Blockchain {}
export class TypeTransaction extends Transaction {}
export class TypecoinBlock extends Block {}