const ethers = require("ethers");
const TOKEN_ID = 1;

const PRIVATE_KEY = "f41246b2d4dd43ae197efb42cdea0d0b75a28d7c107b1c25ae4048d4ab7477f3";
const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const nftaddress = "0xBCcd1aa522e85DaD4fd93f07c3dD60bAC23e8421";
const nftmarketaddress = "0xDCd1Ee5c19f8c02f1f5093D53191921EB457361e";

const NFT = require("../artifacts/contracts/NFT.sol/NFT.json");
const KBMarket = require("../artifacts/contracts/KBMarket.sol/KBMarket.json");

async function test_updatetoken () {
    // what we want to load:
    // we want to get the msg.sender hook up to the signer to display the owner nfts
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer)
    //const data = await marketContract.fetchMarketTokens()
    await marketContract.updateMarketItemPrice(TOKEN_ID, ethers.utils.parseEther("0.005") )
    console.log("updated")
    }

test_updatetoken()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })