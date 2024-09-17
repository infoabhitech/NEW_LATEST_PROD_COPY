import React from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const SERVICE_ID = "service_qfnbd0g";
const TEMPLATE_ID = "template_zd1urjq";
const USER_ID = "4fg8ET5rhvabaZrbS";

const ContactUs = () => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
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
    e.target.reset()
  };

  return (
    <div style={{marginTop:'2rem'}} className='flex justify-center'>
    
    <form onSubmit={handleOnSubmit}>
    <div>
    <h1 className="main-title about-h1 font-bold text-xl text-center subpixel-antialiased">👋 Enquiry, feedback or just want to say Hello! Send us a message:</h1>
    </div>
        <div className='w-full flex flex-col pb-12'>
            <input 
            type="text"
            name="user_name"
            placeholder="Name"
            className='mt-6 border rounded p-4'
            />
            <input 
            type="text"
            name="user_email"
            placeholder="email"
            className='mt-6 border rounded p-4'
            />
            <textarea
            type="text"
            name="user_message"
            placeholder="Message"
            className='mt-6 border rounded p-4'
            />
            <button type='submit'
            className='font-bold mt-4 bg-purple-500 text-white rounded p-4 shadow-lg'>
            Submit
            </button>
        </div>
  </form>
    </div>
);
}


export default ContactUs