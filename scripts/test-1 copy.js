const ethers = require("ethers");

const API_KEY = "8cZ_KnYSDO5-HTR2G2iT9WQCcx8f8nny";
const PRIVATE_KEY = "f41246b2d4dd43ae197efb42cdea0d0b75a28d7c107b1c25ae4048d4ab7477f3";

const token_CONTRACT_ADDRESS = "0xa1394468063B75c252346450dae2f8C912240c60";
const market_CONTRACT_ADDRESS = "0x111177Cf1Bf32e8F0179851d83234B7E6623Ec7f";

const provider = new ethers.providers.AlchemyProvider(network="maticmum", API_KEY);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const tokenOutput = require("../artifacts/contracts/NFT.sol/NFT.json");
const tokenABI = tokenOutput.abi;

const marketOutput = require("../artifacts/contracts/KBMarket.sol/KBMarket.json");
const marketABI = marketOutput.abi;

const tokenContract = new ethers.Contract(token_CONTRACT_ADDRESS, tokenABI, signer);
const marketContract = new ethers.Contract(market_CONTRACT_ADDRESS, marketABI, signer);


async function test1 () {
   const data= await marketContract.fetchMyNFTs()
   console.log(data)
}

test1()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })