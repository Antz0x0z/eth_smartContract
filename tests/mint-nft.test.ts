const { assert, expect } = require('chai');
var config = require('../config.js');
var mint = require('../scripts/mint-nft.js');
var send = require('../scripts/transfer-nft.js');
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = new createAlchemyWeb3(config.API_URL);

const contract = require('../artifacts/contracts/MyNFT.sol/MyNFT.json');
const contractAddress = config.CONTRACT_ADDRESS;
const contractOwner = config.PUBLIC_KEY;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const hash_1 = '0xd840479036b2b2f84b77211f52ec25d515e3da97515275d70f6442ee2fac0467';
const hash_2 = '0x23013c60e76e57bc693c092403622edb15667617ce36108ddf296b02fd8a3a10';

describe('Sample tests: ', () => {
  it.skip('iteration 1', async () => {
    // console.log("iteration 1");
    const getTransaction = await web3.eth.getTransaction(hash_2);
    // console.log("Transaction info: ", getTransaction);
    let transactionIndex = getTransaction.transactionIndex;
    //const index = await web3.eth.tokenOfOwnerByIndex(contractOwner, transactionIndex);
    //console.log("Index: ", index);
  });
  it('Check transaction address: ', async () => {
    let getTransaction = await web3.eth.getTransaction("0xd840479036b2b2f84b77211f52ec25d515e3da97515275d70f6442ee2fac0467");
    let from = getTransaction.from;
    let to = getTransaction.to;
    console.log("\nTransaction info: \nFrom - ", from, "\nTo - ", to);
    assert.equal(from, contractOwner, '== address is not contract owner!');
    assert.equal(to, contractAddress, '== address is not contract address!');
    //let log = web3.eth.abi.decodeLog(getTransaction); // TypeError: inputs.forEach is not a function
    //console.log(log);
    let info = await web3.eth.getTransactionReceipt(hash_2);
    console.log("Transaction info: \n", info);
  });
  it.skip('iteration 3', async () => {
    console.log("iteration 3");
  });
});
