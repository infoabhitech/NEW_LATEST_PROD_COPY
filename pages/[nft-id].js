import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getNFTs, getNftBusinessDetails } from "../lib/nft";
import { FireIcon, CursorArrowRippleIcon, GlobeAltIcon } from "@heroicons/react/24/solid";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import {
  LinkedinShareButton,
  LinkedinIcon,
  InstapaperShareButton,
  InstapaperIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";


export default function NFTDetails() {
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const nftID = router.query["nft-id"];

  async function loadNFTs() {
    // what we want to load:
    // ***provider, tokenContract, marketContract, data for our marketItems***
    const items = await getNFTs();
    const nftDetails = items.find((item) => `${item.tokenId}` === `${nftID}`) ?? {};
    if (nftDetails?.name) {
      const business = (await getNftBusinessDetails(nftDetails.name)) ?? {};
      setNft({ ...nftDetails, business });
    }
    setLoading(false);
  }

  useEffect(() => {
    if (nftID) loadNFTs();
  }, [nftID]);

  // Enable for loading
  /* if (loading)
    return (
      <h1 className="mt-28 flex items-center justify-center gap-2 px-20 py-7 text-4xl">
        <GlobeAltIcon className="h-10 w-10" />
        Loading NFT details...
      </h1>
    ); */

  return (
    <>
      {nft?.name && (
        <div className="grid-cols-12 items-stretch lg:grid">
          <div style={{marginTop:'0.5rem', marginLeft:'0.5rem' }} className="overflow-hidden rounded-xl border shadow lg:col-span-9">
            <img className="mx-auto w-auto object-scale-down p-2" src={nft.image} style={{ height: "85vh" }} />
            {/* Code for showing details from smart contracts */}
            {/* <div className="grid-cols-2 bg-gray-100 lg:grid">
              <div className="flex flex-col items-center justify-center p-2">
                <p className="mb-1 text-3xl font-semibold">{nft.name}</p>
                <div className="flex items-center gap-1 text-indigo-600">
                  <FireIcon className="h-5 w-5" />
                  <p>{nft.description}</p>
                </div>
              </div>
              <div className="p-2">
                <p className="mb-2 text-xl font-bold">{nft.price} MATIC</p>

                <button
                  className="mx-auto flex w-full max-w-md items-center justify-center gap-1 rounded-md bg-indigo-600 py-3 font-bold text-white"
                  onClick={() => buyNFT(nft)}
                >
                  <CursorArrowRippleIcon className="h-5 w-5" />
                  Buy
                </button>
              </div>
            </div> */}
          </div>
          <div className="mx-auto flex h-full flex-col justify-center gap-6 p-2 lg:col-span-">
            {nft?.business?.inputName && (
              <>
                <div className="text-left">
                  <p className="text-lg">Business name</p>
                  <p className="text-xl font-bold">{nft?.business?.inputName ?? ""}</p>
                </div>
                <div className="text-left">
                  <p className="text-lg">Business description</p>
                  <p className="text-xl font-bold">{nft?.business?.inputDescription ?? ""}</p>
                </div>
                <div className="text-left">
                  <p className="text-lg">Country</p>
                  <p className="text-xl font-bold">{nft?.business?.inputCountry ?? ""}</p>
                </div>
                <div className="text-left">
                  <p className="text-lg">City</p>
                  <p className="text-xl font-bold">{nft?.business?.inputRegion ?? ""}</p>
                </div>
                <div className="text-left text-lg">
                  <a className="text-blue-800" href={nft?.business?.inputSocialMediaLink ?? ""} target="_blank">Social Media Link</a>
                </div>
                <div className="text-left">
                  <p className="text-lg">Industry</p>
                  <p className="text-xl font-bold">{nft?.business?.inputIndustry ?? ""}</p>
                </div>
                <div className="text-left">
                  <p className="text-lg">NFT utility</p>
                  <p className="text-xl font-bold">{nft?.business?.inputUtility ?? ""}</p>
                </div>
                <div className="mt-4">
                  <p className="mb-2 text-left font-medium">Share this NFT on</p>
                <div className="flex items-center gap-2">
                    <LinkedinShareButton url="http://google.co.in">
                      <LinkedinIcon size="48" round={true} />
                    </LinkedinShareButton>
                    <FacebookShareButton url="http://google.co.in">
                      <FacebookIcon size="48" round={true} />
                    </FacebookShareButton>
                    <TwitterShareButton url="http://google.co.in">
                      <TwitterIcon size="48" round={true} />
                    </TwitterShareButton>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
