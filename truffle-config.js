const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 9545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, 'https://polygon-mumbai.g.alchemy.com/v2/8cZ_KnYSDO5-HTR2G2iT9WQCcx8f8nny'),
      network_id: 80001,
      chainId: 80001,
      confirmations: 2,
      timeoutBlocks: 200000,
      skipDryRun: true
    },
  },

  compilers: {
    solc: {
     version:'0.8.0',
     optimizer:{
       enabled:'true',
       runs: 200
     }
    }
  },

};