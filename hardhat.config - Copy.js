require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

const fs = require('fs');
const keyData = fs.readFileSync('./p-key.txt', {encoding:'utf8', flag:'r'});

module.exports = {
  networks: {
    polygonAmoy: {
      url: "https://polygon-amoy.infura.io/v3/a9d734796f20457c8cd688dcddda7732" ,
      accounts: [keyData],
      gasPrice: "auto",
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
  },
etherscan: {
    apiKey: {
      polygonAmoy: "1b17a74d-91c4-4fbe-90df-ff55e6381406",
    },
    customChains: [
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL:
            "https://www.oklink.com/api/explorer/v1/contract/verify/async/api/polygonAmoy",
          browserURL: "https://www.oklink.com/polygonAmoy",
        },
      },
    ],
  },
};