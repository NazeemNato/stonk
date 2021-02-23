const SHA384 = require("crypto-js/sha384");
const EC = require('elliptic').ec;

const ec = new EC('secp256k1')

class Transaction {
    constructor(fromAddress, toAddress, amount) {
      this.fromAddress = fromAddress;
      this.toAddress = toAddress;
      this.amount = amount;
  }
  createHash() {
    const blockString = this.fromAddress + this.toAddress + this.amount;
    return SHA384(blockString).toString();
  }

  signTransaction(key) {
    if (key.getPublic('hex') !== this.fromAddress) {
      throw new Error('Not stonk!! you cannot sign transactions')
    }
    const hashTx = this.createHash();
    const sig = key.sign(hashTx, 'base64');
    this.signature = sig.toDER('hex')
  }
  isValid() {
    if (this.fromAddress === null) {
      return true;
    }
    if (!this.signature || this.signature.length === 0) {
      throw new Error('Yo no signature ?')
    }
    const publicKey = ec.keyFromPublic(this.fromAddress,'hex')
    return publicKey.verify(this.createHash(),this.signature)
  }
}

module.exports.Transaction = Transaction;