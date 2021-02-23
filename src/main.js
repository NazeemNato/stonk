const {Transaction} = require('./transaction')
const {BlockChain} = require('./blockchain')

const EC = require('elliptic').ec;

const ec = new EC('secp256k1')


const myKey = ec.keyFromPrivate('ed9079fb8dffc4849e1c5d601ca1c624d71745b81663848e2f14276ebf2cb2a5');
const walletAddress = myKey.getPublic('hex');

let stonk = new BlockChain();

const tx1 = new Transaction(walletAddress, '048f1016ed2f9af4f753df0dda01f97da99af9f2eb774cf91536dd5848713d5ca220cc339298d660e0b43c4257907419bfad0a1d25393fef07b085b2f0b01b63ec', 10);
tx1.signTransaction(myKey);
stonk.addTransaction(tx1)

// Mining
stonk.minePendingTransactions(walletAddress)

// check balance
console.log('Martina balance\n',stonk.getBalance(walletAddress))