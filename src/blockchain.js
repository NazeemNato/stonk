const {Block} = require('./block')
const {Transaction} = require('./transaction')

class BlockChain {
    constructor() {
      this.chain = [this.createGenesisBlock()];
      this.difficulty = 2;
      this.pendingTransactions = [];
      this.reward = 100;
    }
    // first block
    createGenesisBlock() {
      return new Block(0, "2/22/2021", "hello world", "0");
    }
    // get latest block from blockchain
    getLatestBlock() {
      return this.chain[this.chain.length - 1];
    }
    // add block or create new block
    minePendingTransactions(minerAddress) {
      let block = new Block(Date.now(), this.pendingTransactions);
      block.mineBlock(this.difficulty)
      this.chain.push(block)
      console.log('Block mined')
      this.pendingTransactions = [new Transaction(null,minerAddress,this.reward)];
    }
    // add transaction
    addTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Yo empty :|')
        }
        if (!transaction.isValid()) {
            throw new Error('Invalid attempt')
        }
      this.pendingTransactions.push(transaction)
    }
    // get balance
    getBalance(address) {
      let balance = 0;
      for (const block of this.chain) {
        for (const trans of block.transactions) {
          if (trans.fromAddress === address) {
            balance -= trans.amount;
          }
          if (trans.toAddress === address) {
            balance += trans.amount;
          }
        }
      }
      return balance;
    }
    // checking chain is valid ?
    isChainValid() {
      for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
          const previousBlock = this.chain[i - 1];
          
        if(!currentBlock.hasValidTransaction()){
            return false;
        }
  
        if (currentBlock.hash !== currentBlock.createHash()) {
          return false;
        }
  
        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }
      return true;
    }
}

module.exports.BlockChain = BlockChain;