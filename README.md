# eth_smartContract

ERC721 test Smart Contract for Metamask app.

Install Hardhat, is a development environment to compile, deploy, test, and debug your Ethereum software: 

>$ npm install --save-dev hardhat 

and install the dotenv package:

>$ npm install dotenv --save

Install Ethers.js, is a library that makes it easier to interact and make requests to Ethreum by wrapping standard JSON-RPC methods with more user friendly methods:

>$ npm install --save-dev @nomiclabs/hardhat-ethers 'ethers@^5.0.0'

*Compile NFT smart contract code, which based off of the OpenZepplin library's ERC721 implementation*

>$ npm install @openzeppelin/contracts@3.1.0-solc-0.7 to install the OpenZepplin contracts library

Run compile Soidity code:

>$ npx hardhat compile

*Deploy ERC721 smart-contract*

Navigate back to the root of your project directory, and in the command line run:

>$ npx hardhat run scripts/deploy.js --network rinkeby

You should then see something like:
Contract deployed to address: <0x...>

If we go to the Rinkeby etherscan and search for our contract address we should able to see that it has been deployed successfully. 

*Mint NFT-tokens*

Now, deploy your NFT, and in the command line run:

>$ node scripts/mint-nft.js

You should then see something like:
The hash of your transaction is: <0x...>

Check https://rinkeby.etherscan.io/ to view the status of your transaction!

*See NFT-tokens to the Metamask app (Ethereum Rinkeby-testnet).*

*Transfer NFT-tokens*

Transfer your NFT (from TokenID) to other ethereum address in the command line run:

>$ node scripts/transfer-nft.js

You should then see something like:
The hash of your transaction is: <0x...>
