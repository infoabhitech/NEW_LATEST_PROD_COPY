import "../styles/globals.css";
import "./app.css";
import logo from "../images/logo.png";
import Link from "next/link";
import Image from "next/image";
import { Nav, NavItem} from 'reactstrap';


function NFTMarketplace({Component, pageProps}) {
  return (
    <div>
      
      <nav className="grid grid-cols-10 items-center border-b p-4" style={{ backgroundColor: "white" }}>
      <div className="col-span-1">
          <div className="mx-auto h-16 w-16">
            <Link href="/">
              <Image src={logo} className="w-full cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="col-span-8">   

        <div className='flex mt-4 justify-center'>
        
          <Link href='/'>
            <a className='mr-6 text-black font-bold'>
              Home
            </a>
          </Link>
          <Link href='/digital-arena'>
            <a className='mr-6 text-black font-bold'>
              Digital Arena
            </a>
          </Link>
          <Link href='/business-brand'>
            <a className='mr-6 text-black font-bold'>
              Business | Brand
            </a>
          </Link>
          <Link href='/mint-item'>
            <a className='mr-6 text-black font-bold'>
              Mint Tokens
            </a>
          </Link>
          <Link href='/business-dashboard'>
            <a className='mr-6 text-black font-bold'>
              Business Dashboard
            </a>
          </Link>
          <Link href='/customer-collector'>
            <a className='mr-6 text-black font-bold'>
              Customer | Collector
            </a>
          </Link>
          <Link href='/my-nfts'>
            <a className='mr-6 text-black font-bold'>
              My NFts
            </a>
          </Link>
          <Link href='/contact-us'>
            <a className='mr-6 text-black font-bold'>
              Contact Us
            </a>
          </Link>
          <Link href='/getting-started'>
            <a className='mr-6 text-black font-bold'>
              Getting Started
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