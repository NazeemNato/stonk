const SHA384 = require("crypto-js/sha384");

require('./transaction');

class Block {
  constructor(timestamp, transactions, previousHash) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.createHash();
    this.nonce = 0;
  }

  createHash() {
    const blockString =
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce;
    return SHA384(blockString).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.createHash();
    }
    console.log("Stonk : " + this.hash);
    }
    
    hasValidTransaction() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }
        return true;
    }
}

module.exports.Block = Block;