const ethers = require("ethers");

const PRIVATE_KEY = "f41246b2d4dd43ae197efb42cdea0d0b75a28d7c107b1c25ae4048d4ab7477f3";
const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const nftaddress = "0xdCf6CdD9d4AA1DBb7F38F25ef7b3f597805160AF";
const nftmarketaddress = "0x51Eb096bDAB7c3e41fa7A4A8Dec236402b39d7cb";

const NFT = require("../artifacts/contracts/NFT.sol/NFT.json");
const KBMarket = require("../artifacts/contracts/KBMarket.sol/KBMarket.json");

async function test1 () {
    // what we want to load:
    // we want to get the msg.sender hook up to the signer to display the owner nfts
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer)
    //const data = await marketContract.fetchMarketTokens()
    const data = await marketContract.fetchMarketTokens()
    console.log(data)
    }

test1()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })