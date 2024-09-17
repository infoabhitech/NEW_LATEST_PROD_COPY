
// we want to load the users nfts and display

import {ethers} from 'ethers'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import {useRouter} from 'next/router';
import { nftaddress, nftmarketaddress } from '../config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import RiseandFame from '../artifacts/contracts/RiseandFame.sol/RiseandFame.json'

export default function AccountDashBoard() {
    // array of nfts
  const [nfts, setNFts] = useState([])
  const [sold, setSold] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [formInput, updateFormInput] = useState({newprice: ''})

  const router = useRouter()

  useEffect(()=> {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    // what we want to load:
    // we want to get the msg.sender hook up to the signer to display the owner nfts

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, RiseandFame.abi, signer)
    const data = await marketContract.fetchItemsCreated()

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

    // create a filtered aray of items that have been sold
    const soldItems = items.filter(i=> i.sold)
    setSold(soldItems)
    setNFts(items)
    setLoadingState('loaded')
  }

  async function updatePrice(nft) {
    const price = ethers.utils.parseUnits(formInput.newprice.toString(), 'ether').toString()
    if(!price) return 

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, RiseandFame.abi, signer)
    const transaction = await contract.updateMarketItemPrice(nft.tokenId, price)
    
    await transaction.wait()
    router.push('./')
}
  
  if(loadingState === 'loaded' && !nfts.length) return (<h1
  className='px-20 py-7 text-4x1'>You have not minted any NFTs!</h1>)

  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  };

  return (
    <div className='p-4'>
        <h1 style={{fontSize:'20px', color:'purple'}}>Tokens Minted</h1>
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
                    <div className='p-4 bg-black'>
                        <p className='text-3x-1 mb-2 font-bold text-white'>Token ID {nft.tokenId} - {nft.price} MATIC </p>
                        <div style={divStyle}>
                        <input
                        style={{width: "50%"}}
                        placeholder='New Price in Matic'
                        className='mt-0 mb-0 border rounded p-2'
                        onChange={ e => updateFormInput({...formInput, newprice: e.target.value})} 
                        />
                        <button onClick={()=> updatePrice(nft)} style={{width: "40%"}}
                        className='font-bold mt-0 mb-0 bg-purple-500 text-white rounded p-2 shadow-lg'
                        >
                          Update
                        </button>
                     </div>
                    </div>
                </div>
              ))
            }
          </div>
          </div>
    </div>
  )
}
