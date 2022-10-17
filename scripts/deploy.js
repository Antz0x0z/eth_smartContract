let config = require("../config.js");
const hre = require("hardhat");

const {
  getEstimatedTxGasCost,
  getActualTxGasCost,
  chainNameById,
  chainIdByName,
  saveDeploymentData,
  getContractAbi,
} = require("./helpers/utils");

async function main() {
  const { ethers } = hre;
  const network = await hre.network;
  const deployData = {};

  let tx, receipt;
  const chainId = chainIdByName(network.name);

  console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("ERC721 Contract Deployment");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

  console.log(`  Using Network: ${chainNameById(chainId)} (${network.name}:${chainId})`);
  console.log("  Using Owner:  ", config.PUBLIC_KEY);
  console.log(" ");

  console.log("Deploying...");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  const constructorArgs = [config.TOKEN_NAME, config.TOKEN_SYMBOL];
  const NFT = await ethers.getContractFactory("MyNFT");
  const NFTInstance = await NFT.deploy(...constructorArgs);
  const myNFT = await NFTInstance.deployed();
  deployData['MyNFT'] = {
    abi: getContractAbi('MyNFT'),
    address: myNFT.address,
    deployTransaction: myNFT.deployTransaction,
    constructorArgs,
  }

  saveDeploymentData(chainId, deployData);
  console.log("  - Contract deployed to address: ", myNFT.address);
  console.log("  - Gas Cost:                     ", getEstimatedTxGasCost({ deployTransaction: myNFT.deployTransaction }));

  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("    Contract Deployment Complete.");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");

   
  
  console.log("Minting a one NFT...");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  tx = await myNFT.mint(config.PUBLIC_KEY, config.PIN_URL)
  receipt = await tx.wait();
  console.log("  - Gas Cost:                 ", getActualTxGasCost({ deployTransaction: receipt })); 
  console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("Minting ERC721 NFT's Complete.");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});