import * as crypto from 'crypto';
const SHA256 = (data: any) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

export class Block {
  timestamps: string;
  data: any;
  hash: string;
  prevHash: string;
  nonce: number;
  constructor(timestamps: string, data: any) {
    this.timestamps = timestamps;
    this.data = data;
    this.hash = this.getHash();
    this.prevHash = '';
    this.nonce = 0;
  }
  getHash() {
    return SHA256(this.prevHash + this.timestamps + JSON.stringify(this.data));
  }
  mine(difficulty: number) {
    while (!this.hash.startsWith(Array(difficulty + 1).join('0'))) {
      // Tăng nonce
      this.nonce++;
      // Cập nhật hash mới
      this.hash = this.getHash();
    }
  }
}
