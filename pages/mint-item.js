import {ethers} from 'ethers';
import {useState} from 'react';
import Web3Modal from 'web3modal';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import { nftaddress, nftmarketaddress } from '../config';
import NFT from '../artifacts/contracts/NFT.sol/NFT.json';
import {useRouter} from 'next/router';
import RiseandFame from '../artifacts/contracts/RiseandFame.sol/RiseandFame.json';
const projectId = "2Y9wmDTMkkF3sUmqXZC6AHW82A5";
const projectSecretKey = "3a14f2d4f9ee6623c0ceebffe25f2b7d";
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

// in this component we set the ipfs up to host our nft data of
// file storage 

//const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const client = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization
    }
  })

export default function MintItem() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({price: '', name:'',
description:''})
    const router = useRouter()


    // set up a function to fireoff when we update files in our form - we can add our 
    // NFT images - IPFS

    async function onChange(e) {
        const file = e.target.files[0]
        try {
        const added = await client.add(
            file, {
                progress: (prog) => console.log(`received: ${prog}`)
            })
        const url = `https://risenfame.infura-ipfs.io/ipfs/${added.path}`
        setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file:', error)
        }
    }

    async function createMarket() {
        const {name, description, price} = formInput 
        if(!name || !description || !price || !fileUrl) return 
        // upload to IPFS
        const data = JSON.stringify({
            name, description, image: fileUrl
        })
        try {
            const added = await client.add(data)
            const url = `https://risenfame.infura-ipfs.io/ipfs/${added.path}`
            // run a function that creates sale and passes in the url 
            createSale(url)
            } catch (error) {
                console.log('Error uploading file:', error)
            }
    }

    async function createSale(url) {
        // create the items and list them on the marketplace
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        // we want to create the token
        let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        let transaction = await contract.mintToken(url)
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()
        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        
        // list the item for sale on the marketplace 
        contract = new ethers.Contract(nftmarketaddress, RiseandFame.abi, signer)
        // let listingPrice = await contract.getListingPrice()
        // listingPrice = listingPrice.toString()

        //transaction = await contract.makeMarketItem(nftaddress, tokenId, price, {value: listingPrice})
        transaction = await contract.makeMarketItem(nftaddress, tokenId, price)
        await transaction.wait()
        router.push('./')
    }

    return (
        <div className='flex justify-center'>
            <div className='w-1/2 flex flex-col pb-12'>
                <input
                placeholder='Business Name'
                className='mt-8 border rounded p-4'
                onChange={ e => updateFormInput({...formInput, name: e.target.value})} 
                />
                <textarea
                placeholder='NFT Description'
                className='mt-2 border rounded p-4'
                onChange={ e => updateFormInput({...formInput, description: e.target.value})} 
                />
                <input
                placeholder='NFT Price in Matic'
                className='mt-2 border rounded p-4'
                onChange={ e => updateFormInput({...formInput, price: e.target.value})} 
                />
                <input
                type='file'
                name='Asset'
                className='mt-4'
                onChange={onChange} 
                /> {
                fileUrl && (
                    <img className='rounded mt-4' width='350px' src={fileUrl} />
                )}
                <button onClick={createMarket}
                className='font-bold mt-4 bg-purple-500 text-white rounded p-4 shadow-lg'
                >
                    Mint NFT
                </button>
            </div>
        </div>
    )

}