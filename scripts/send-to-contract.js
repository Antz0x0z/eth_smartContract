async function main() {
    let config = require('./config.js');
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(config.API_URL);
    const contract = require("../abis/MyNFT.json");
    const contractAddress = config.CONTRACT_ADDRESS;
    const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
    const sender = config.PUBLIC_KEY;
    const privKey = config.PRIVATE_KEY;
    const nonce = await web3.eth.getTransactionCount(sender, 'latest'); // nonce starts counting from 0

    const tx = {
     // 'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // faucet address to return eth
     // 'value': 1000000000000000000, // 1 ETH
     'to': contractAddress, //payable contract address
     'value': 100000000000000000, // 0.1 ETH
     'gas': 70000, 
     'nonce': nonce,
     'data': nftContract.methods.sendByers().encodeABI()
    };
   
    const signedTx = await web3.eth.accounts.signTransaction(tx, privKey);
    
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction (0.1 ETH) is: ", hash);
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();