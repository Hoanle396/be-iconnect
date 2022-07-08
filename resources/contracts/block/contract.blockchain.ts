import { Block } from './contract.block';

export class Blockchain {
  chain: Block[];
  difficulty: number;
  blockTime: number;
  constructor() {
    this.chain = [new Block(Date.now().toString(), '')];
    this.difficulty = 1;
    this.blockTime = 30000;
  }
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }
  addBlock(block: Block) {
    block.prevHash = this.getLastBlock().hash;
    block.hash = block.getHash();
    block.mine(this.difficulty);
    this.chain.push(block);
    this.difficulty +=
      Date.now() - parseInt(this.getLastBlock().timestamps) < this.blockTime ? 1 : -1;
  }
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (
        currentBlock.hash !== currentBlock.getHash() ||
        prevBlock.hash !== currentBlock.prevHash
      ) {
        return false;
      }
    }

    return true;
  }
}
