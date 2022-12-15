import { BlockHeaderModel, PayloadModel } from './models/BlockchainModel';
export declare class Block {
    header: BlockHeaderModel;
    payload: PayloadModel;
    constructor(header: BlockHeaderModel, payload: PayloadModel);
}
