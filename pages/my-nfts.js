// we want to load the users nfts and display

import {ethers} from 'ethers'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import { nftaddress, nftmarketaddress } from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import RiseandFame from '../artifacts/contracts/RiseandFame.sol/RiseandFame.json'

import React from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';


export default function MyAssets() {
    // array of nfts
  const [nfts, setNFts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [formInput, updateFormInput] = useState('');

  useEffect(()=> {
    loadNFTs()
  }, [])


    const handleOnSubmit = async (e) => {
     
    formInput("");
    
    emailjs.init("4fg8ET5rhvabaZrbS");
    e.preventDefault();
    let name = e.target.getAttribute("data-name")

    const response =  await fetch('/api/getBusinessData'); 
    const data =  await response.json(); 
    let filteredArrayValues = data
    .filter(item => item.inputName === name)
    console.log(filteredArrayValues[0].inputEmail);

    const mail = filteredArrayValues[0].inputEmail;
    const SERVICE_ID = "service_qfnbd0g";
    const TEMPLATE_ID = "template_zd1urjq";
    const USER_ID = "4fg8ET5rhvabaZrbS";
    var templateParams = {
    user_message: "NFT Purchased! Would like to receive rewards on my email-id:",
    user_email: formInput,
    to_email: "mail-us@percentpulse.com",
    };
    
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then((result) => {
        updateFormInput('');
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully'
        })
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'Ooops, something went wrong',
          text: error.text,
        })
      });
  };


  async function loadNFTs() {
    // what we want to load:
    // we want to get the msg.sender hook up to the signer to display the owner nfts

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, RiseandFame.abi, signer)
    const data = await marketContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      // we want get the token metadata - json 
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image, 
        name: meta.data.name,
        description: meta.data.description
      }
      return item
      
    }))

    setNFts(items)
    setLoadingState('loaded')
  }
  
  if(loadingState === 'loaded' && !nfts.length) return (<h1
  className='px-20 py-7 text-4x1'>You do not own any NFTs currently :(</h1>)

  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  };
  


  return (
    <div className='flex justify-center'>
          <div className='px-4' style={{maxWidth: '1600px'}}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
            {
              nfts.map((nft, i)=>(
                <div key={i} className='border shadow rounded-x1 overflow-hidden'>
                  <img className="object-scale-down h-48 w-96" src={nft.image} />
                  <div className='p-4'>
                    <p style={{height:'64px'}} className='text-3x1 font-semibold'>{
                      nft.name}</p>
                    <div style={{height:'72px', overflow:'hidden'}}>
                    <p className='text-gray-400'>{nft.description}</p>
                    </div>
                    </div>
                    <div className='p-0 bg-black'>
                    <p className='text-3x-1 mb-4 font-bold text-white'>Token ID {nft.tokenId} - {nft.price} MATIC</p>
                    </div> 
                    <div style={divStyle}> 
                     <input 
                     style={{width: "60%"}}
                     className='mt-2 mb-2 border rounded p-2'
                     type="text"
                     placeholder='Enter your e-mail address'
                     onChange={(e) => updateFormInput(e.target.value)}
                     />  
                     <button 
                     data-name={nft.name}
                     value={formInput}
                     onClick={handleOnSubmit} style={{width: "30%"}}
                     className='font-bold mt-2 mb-2 bg-purple-500 text-white rounded p-2 shadow-lg'>
                     Send e-mail
                     </button>
                    </div>
           
                </div>
              )
              )
            }
          </div>
        </div>
    </div>
  )
}
