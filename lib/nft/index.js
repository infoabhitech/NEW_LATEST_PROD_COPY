import { ethers } from "ethers";
import { nftaddress, nftmarketaddress } from "../../config";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import RiseandFame from "../../artifacts/contracts/RiseandFame.sol/RiseandFame.json";
import axios from "axios";

const provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.infura.io/v3/2Y9wmDTMkkF3sUmqXZC6AHW82A5");

export const getNFTs = async () => {
  // what we want to load:
  // ***provider, tokenContract, marketContract, data for our marketItems***

  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(nftmarketaddress, RiseandFame.abi, provider);
  const data = await marketContract.fetchMarketTokens();
  const items = await Promise.all(
    data.map(async (i) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      // we want get the token metadata - json
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description
      };
      return item;
    })
  );

  return items ?? [];
};

export const getNftBusinessDetails = async (businessName) => {
  try {
    const { data } = await axios.post("/api/nft-business-details", { business_name: businessName });
    return data?.business;
  } catch (err) {
    throw err;
  }
};