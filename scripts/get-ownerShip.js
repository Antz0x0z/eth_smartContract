
var config = require('../config.js');
const account = config.PUBLIC_KEY;
const contractAddress = config.CONTRACT_ADDRESS
const contractABI = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
const Web3 = require("web3");
const infuraKey = config.INFURA_API_KEY;
const tokenID = 1;
const Index = 10;
const provider = new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/`+infuraKey);
const web3 = new Web3(provider);
const rec_2 = "0x9Ee3436cEa42c8ff14B327d2a08086b44f85b957";
const Index_rec_2 = 1;

const ERC721 = new web3.eth.Contract(contractABI.abi, contractAddress);
////let ownerShip = ERC721.methods.ownerOf(tokenID).call().then(console.log);
//console.log("ownerShip", ownerShip);
////let totalSupply = ERC721.methods.totalSupply().call().then(console.log);
//console.log("totalSupply", totalSupply);
//let conv = web3.utils.hexToNumber(totalSupply);
//console.log("conv", conv);
ERC721.methods.tokenOfOwnerByIndex(account, Index).call().then(console.log);
ERC721.methods.tokenOfOwnerByIndex(rec_2, Index_rec_2).call().then(console.log);
