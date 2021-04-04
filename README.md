# eth_smartContract
ERC721 test Smart Contract for Metamask app.

*Deploy ERC721 smart-contract*

Navigate back to the root of your project directory, and in the command line run:
npx hardhat run scripts/deploy.js --network rinkeby

You should then see something like:
Contract deployed to address: <0x...>

If we go to the Rinkeby etherscan and search for our contract address we should able to see that it has been deployed successfully. 

*Mint NFT-tokens*

Now, deploy your NFT, and in the command line run:
node scripts/mint-nft.js

You should then see something like:
The hash of your transaction is: <0x...>
Check https://rinkeby.etherscan.io/ to view the status of your transaction!

*See NFT-tokens to the Metamask app (Ethereum Rinkeby-testnet).*