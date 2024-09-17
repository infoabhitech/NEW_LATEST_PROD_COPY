import "../styles/globals.css";
import "./app.css";
import logo from "../images/logo.ico";
import Link from "next/link";
import Image from "next/image";
import { Nav, NavItem} from 'reactstrap';


function NFTMarketplace({Component, pageProps}) {
  return (
    <div>
      
      <nav className="grid grid-cols-10 items-center border-b p-4" style={{ backgroundColor: "purple" }}>
      <div className="col-span-1">
          <div className="mx-auto h-16 w-16">
            <Link href="/">
              <Image src={logo} className="w-full cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="col-span-8">
      
        <p className='text-2xl text-center font-bold text-white'>Discover Brand Enagement with NFTs</p>
        

        <div className='flex mt-4 justify-center'>
        
          <Link href='/'>
            <a className='mr-6'>
              Main Marketplace
            </a>
          </Link>
          <Link href='/business-brand'>
            <a className='mr-6 text-white'>
              Business|Brand
            </a>
          </Link>
          <Link href='/mint-item'>
            <a className='mr-6'>
              Mint Tokens
            </a>
          </Link>
          <Link href='/business-dashboard'>
            <a className='mr-6'>
              Business Dashboard
            </a>
          </Link>
          <Link href='/customer-collector'>
            <a className='mr-6 text-white'>
              Customer|Collector
            </a>
          </Link>
          <Link href='/my-nfts'>
            <a className='mr-6'>
              My NFts
            </a>
          </Link>
          <Link href='/about'>
            <a className='mr-6 text-black font-bold'>
              About
            </a>
          </Link>
          <Link href='/contact-us'>
            <a className='mr-6'>
              Contact Us
            </a>
          </Link>
          <Link href='/getting-started'>
            <a className='mr-6'>
              Getting Started
            </a>
          </Link>
          <Link href='/video'>
            <a className='mr-6'>
              Video
            </a>
          </Link>
          </div>
          </div>
      </nav>
      <Component {...pageProps} />
    
      <nav className="navbar fixed-bottom bottom-0 right-0 navbar-light" role="navigation">
      <Nav className="w-100">
      <div className='flex mt-4 justify-center'>
        <h1 className='mr-6 text-sm text-black font-bold'>Copyright © 2024 Percent Pulse Pvt. Ltd. All rights reserved.</h1>
        <Link href='/privacy-policy'>
          <a className='mr-6 text-sm text-black font-bold'>
            Privacy Policy
          </a>
        </Link>
        <Link href='/terms-and-conditions'>
          <a className='mr-6 text-sm text-black font-bold'>
            Terms and Conditions
          </a>
        </Link>
        </div>
        </Nav>
      </nav>
      
    </div>
    
  ) 
}

export default NFTMarketplace 