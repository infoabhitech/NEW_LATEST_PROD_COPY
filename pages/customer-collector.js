import { useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export default function Home() {
  const [inputName, setInputName] = useState('');
  const [inputCountry, setInputCountry] = useState('');
  const [inputRegion, setInputRegion] = useState('');
  const [inputEmail, setInputEmail] = useState('');

  const handleSaveData = async () => {
    const response = await fetch('/api/submitCustomerData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({inputName, inputCountry, inputRegion, inputEmail}),
    });

    if (response.ok) {
      alert('Signup successfull & All set for NFT shopping!');
      setInputName('');
      setInputCountry('');
      setInputRegion('');
      setInputEmail('');
    } else {
      alert('Something went wrong!');
    }
  };

 return (
        <div className='flex justify-center'>
            <div style={{marginTop:'1rem'}} className='w-1/2 flex flex-col pb-12'>
                <h1 align="center" className="main-title about-h1 font-bold text-1xl text-left subpixel-antialiased"> Sign up to grab NFT experiences and utilities! </h1>
                <input 
                type="text"
                placeholder='Name'
                className='mt-6 border rounded p-4'
                value={inputName}
                onChange={(e) => setInputName(e.target.value)} 
                />
                <CountryDropdown
                className='mt-6 border rounded p-4'
                value={inputCountry}
                onChange={(e) => setInputCountry(e)}
                />
                <input 
                type="text"
                placeholder='Nearest City'
                className='mt-6 border rounded p-4'
                value={inputRegion}
                onChange={(e) => setInputRegion(e.target.value)} 
                />
                <input 
                type="text"
                placeholder='Email'
                className='mt-6 border rounded p-4'
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)} 
                />
                <button onClick={handleSaveData}
                className='font-bold mt-4 bg-purple-500 text-white rounded p-4 shadow-lg'
                >
                    Submit
                </button>
            </div>
        </div>
    )
}