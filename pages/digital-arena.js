import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import Web3Modal from "web3modal";
import { nftaddress, nftmarketaddress } from "../config";
// import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import KBMarket from "../artifacts/contracts/RiseandFame.sol/RiseandFame.json";
import { getNFTs } from "../lib/nft";

export default function Home() {
  const [nfts, setNFts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    // what we want to load:
    // ***provider, tokenContract, marketContract, data for our marketItems***
    const items = await getNFTs();
    setNFts(items);
    setLoadingState("loaded");
  }

  // function to buy nfts for market

  async function buyNFT(nft) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, KBMarket.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    });

    await transaction.wait();
    loadNFTs();
  }
  
   

  if (loadingState === "loaded" && !nfts.length) return <h1 className="text-4x1 px-20 py-7">No NFts in marketplace</h1>;
  // Enable for loading UI
  /* else if (loadingState === "not-loaded")
		return (
			<h1 className="flex gap-2 justify-center items-center px-20 py-7 mt-28 text-4xl">
				<GlobeAltIcon className="h-10 w-10" />
				Loading NFTs...
			</h1>
		); */

   
  return (
    <>
    <div className="flex justify-left">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {nfts.map((nft, i) => (
            <div className="rounded-xl overflow-hidden border shadow" key={i}>
              <Link href={`${nft.tokenId}`}>
                <img class="h-64 w-72 object-contain cursor-pointer" src={nft.image} />
              </Link>
              <div className="p-4">
                <p style={{ height: "16px" }} className="text-3x1 font-semibold">
                  {nft.name}
                </p>
                <div style={{ height: "48px", overflow: "hidden" }}>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>

              <div className="bg-black p-1">
                <p className="text-3x-1 mb-4 font-bold text-white">{nft.price} MATIC</p>
                <button
                  className="w-full rounded bg-purple-500 px-12 py-3 font-bold text-white"
                  onClick={() => buyNFT(nft)}
                >
                  Buy
                </button>
                
              </div>
              
            </div>
            
          ))}
          
        </div>
      </div>
    </div>
    <div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </div>
    </>
  );
  
}