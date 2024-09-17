const ethers = require("ethers");
const TOKEN_ID = 1;

const PRIVATE_KEY = "88f180a67b48513cfa52827e028614651dde021b439b3a1267c548f444d9c002";
const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const nftmarketaddress = '0x0CDB67e809b78E52C6141b48Fa6d84De144eeB25'
const nftaddress = '0x8bC571D3a69ef875Dfdba46c05e5525356349C91'

const NFT = require("../artifacts/contracts/NFT.sol/NFT.json");
const KBMarket = require("../artifacts/contracts/KBMarket.sol/KBMarket.json");

async function test_canceltoken () {
    // what we want to load:
    // we want to get the msg.sender hook up to the signer to display the owner nfts
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer)
    //const data = await marketContract.fetchMarketTokens()
    await marketContract.cancelMarketItem(TOKEN_ID)
    console.log("cancelled")
    }

test_canceltoken()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })