require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

const fs = require('fs');
const keyData = fs.readFileSync('./p-key.txt', {encoding:'utf8', flag:'r'});

module.exports = {
  networks:{
    mainnet:{
      url:'https://polygon-rpc.com',
      accounts:[keyData],
      chainId: 137,
      gasPrice: "auto"
    }
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};