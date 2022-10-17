let config = require("./config");

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("hardhat-abi-exporter");
require("solidity-coverage");

const mnemonic = config.WALLET_MNEMONIC;
const optimizerEnabled = config.OPTIMIZER_ENABLED === 'true';

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: optimizerEnabled,
            runs: 200,
          },
        },
        evmVersion: "istanbul",
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./build/contracts",
    deploy: "./deploy",
    deployments: "./deployments",
  },
  networks: {
    hardhat: {
      blockGasLimit: 200000000,
      allowUnlimitedContractSize: true,
      gasPrice: 60e9,
    },
    localhost: {
      blockGasLimit: 200000000,
      allowUnlimitedContractSize: true,
      gasPrice: 60e9,
    },
    goerli: {
      url: config.API_URL,
      gasPrice: 1e9,
      accounts:  {
        mnemonic,
        initialIndex: 0,
        count: 10,
      },
    
    },
    /* goerli: {
      url: `https://goerli.infura.io/v3/${config.INFURA_GOERLI_APIKEY}`,
      gasPrice: 1e9,
      accounts: mnemonic
    }, */
    mumbai: {
      url: `https://matic-mumbai.chainstacklabs.com/`,
      gasPrice: 1e9,
      accounts: {
        mnemonic,
        initialIndex: 0,
        count: 10,
      },
      chainId: 80001,
    },
  }
}
