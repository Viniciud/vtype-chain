import { BlockHeaderModel, PayloadModel } from './models/BlockchainModel'

export class Block {
  header: BlockHeaderModel
  payload: PayloadModel

  constructor(header: BlockHeaderModel, payload: PayloadModel) {
    this.header = header
    this.payload = payload
  }
}
