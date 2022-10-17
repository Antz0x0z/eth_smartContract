let config = require("../config.js");
const {
  getEstimatedTxGasCost,
  getActualTxGasCost,
  chainNameById,
  chainIdByName,
  saveDeploymentData,
  getContractAbi,
} = require("./helpers/utils");
async function minting() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = new createAlchemyWeb3(config.API_URL);
  const contract = require("../abis/MyNFT.json");
  const contractAddress = config.CONTRACT_ADDRESS;
  const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

  async function mint(owner ,tokenURI) {
    console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Minting a one NFT...");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    //let tx = nftContract.methods.mint(owner ,tokenURI)
    const tx = {
      'from': config.PUBLIC_KEY,
      'to': contractAddress,
      'nonce': await web3.eth.getTransactionCount(config.PUBLIC_KEY, 'latest'),
      'gas': 100000,
      'data': nftContract.methods.mint(owner ,tokenURI).encodeABI()
    }
    const signPromise = web3.eth.accounts.signTransaction(tx, config.PRIVATE_KEY);
    signPromise.then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash ) {
        if (!err) {
          console.log("The hash of your transaction is: ", hash);
          console.log("Minting ERC721 NFT's Complete.");
          console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
        } else {
          console.log("Something went wrong when submitting your transaction:", err)
        } 
      }); 
    }).catch((err) => {
      console.log("Promise failed: ", err);
    });
     
  }
  mint(config.PUBLIC_KEY, config.PIN_URL);
  }
  
  module.exports = minting();