const { assert, expect } = require('chai');
var config = require('../config.js');
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const Web3 = require("web3");
const infuraKey = config.INFURA_API_KEY;
const provider = new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/`+infuraKey);
const web3 = new Web3(provider);
const contractAddress = config.CONTRACT_ADDRESS;
const contractOwner = config.PUBLIC_KEY;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const txHash = '0x8786888e22b389c104439c74aac50e2688eb277ef9d6e93eddbc725c95bb5fd8'; // Test transaction hash

describe('Check contract minting -> ', () => {
  it('Check transaction address: ', async () => {
    let getTransaction = await web3.eth.getTransaction(txHash); // Transaction hash
    let from = getTransaction.from;
    let to = getTransaction.to;
    //console.log("\nTransaction info: \nFrom - ", from, "\nTo - ", to);
    assert.equal(from, contractOwner, '== address is not contract owner!');
    assert.equal(to, contractAddress, '== address is not contract address!');
    let count = await web3.eth.getTransactionCount(contractAddress);
    //console.log("Transaction count: \n", count);
    assert.isNotNull(count, '== Transaction count is null!')
  });
  it('Check ERC721 token balance: ', async () => {
    let balanceOf = await nftContract.methods.balanceOf(contractOwner).call();
    //console.log("Balance count: ", balanceOf.toString());
    assert.isNotNull(balanceOf, '== ERC721 token count is null!')
  })
  it('Check ERC721 token total supply: ', async () => {
    let totalSupply = await nftContract.methods.totalSupply().call();
    //console.log("Total supply: ", totalSupply.toString());
    assert.isNotNull(totalSupply, '== ERC721 token not supplyed!')
  })
});

describe('Check contract transfer -> ', () => {
  it('Check contract transaction address: ', async () => {
    let getTransaction = await web3.eth.getTransaction(txHash); // Transaction hash
    let from = getTransaction.from;
    let to = getTransaction.to;
    //console.log("\nTransaction info: \nFrom - ", from, "\nTo - ", to);
    assert.equal(from, contractOwner, '== address is not contract owner!');
    assert.equal(to, contractAddress, '== address is not contract address!');
    let count = await web3.eth.getTransactionCount(contractAddress);
    //console.log("Transaction count: \n", count);
    assert.isNotNull(count, '== Transaction count is null!')
  });
  it('Check ERC20 contract token balance: ', async () => {
    let balanceOf = await nftContract.methods.balanceOf(contractOwner).call();
    //console.log("Balance count: ", balanceOf.toString());
    assert.isNotNull(balanceOf, '== ERC20 token count is null!')
  })
  it('Check ERC20 contract token total supply: ', async () => {
    let totalSupply = await nftContract.methods.totalSupply().call();
    //console.log("Total supply: ", totalSupply.toString());
    assert.isNotNull(totalSupply, '== ERC20 token not supplyed!')
  })
  it('Check contract list byers: ', async () => {
    let getByers = await nftContract.methods.getByers().call();
    //console.log("Total list byers: ", getByers.toString());
    assert.isNotNull(getByers, '== byers not listed!')
  })
});
