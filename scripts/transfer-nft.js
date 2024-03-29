async function transferToken() {
let config = require('./config.js');
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = new createAlchemyWeb3(config.API_URL);
const contract = require("../abis/MyNFT.json");
const contractAddress = config.CONTRACT_ADDRESS;
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const sender = config.PUBLIC_KEY;
const recipient = config.RECIPIENT;

let tokenID = " "; // variable token_id

async function transferNFT(tokenID) {
  const nonce = await web3.eth.getTransactionCount(sender, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': sender,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'data': nftContract.methods.transferERC721(sender, recipient, tokenID).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, config.PRIVATE_KEY);
  signPromise.then((signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash ) {
      if (!err) {
        console.log("The hash of your transaction (Rinkeby test network) is: ", hash);
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      } 
    }); 
  }).catch((err) => {
    console.log("Promise failed: ", err);
  }); 
}
transferNFT(tokenID);
}
module.exports = transferToken();