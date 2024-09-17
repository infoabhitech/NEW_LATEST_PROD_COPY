import Image from 'next/image';
import business_workflow from "../images/Business_Workflow.png";
import customer_workflow from "../images/Customer_Workflow.png";


const MyComponent = () => (
    <div className="image-grid">
        <h1 className='mr-6 mt-4 text-lg text-black font-bold'>Get started with Rise&Fame</h1>
        <div className="grid-container">
        <div className="grid-item">
                <Image src=
                {business_workflow}
                    alt="Image 2"
                    width="700"
                    height="400"
                     />
            </div>
            <div className="grid-item">
                <Image src=
                {customer_workflow}
                    alt="Image 2"
                    width="700"
                    height="400"
                     />
            </div>
        </div>
        <style jsx>{`
      .title {
        color: black;
      }
      .image-grid {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .grid-container {
        display: grid;
        /* Adjust the minmax width as needed */
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
        gap: 350px; 
        justify-items: center;
        width: 600%;
        max-width: 1200px;
        margin-top: 20px;
      }
      .grid-item {
        position: relative;
        justify-items: center;
        width: 600%; /* Ensure grid items take full width */
        height: 0; 
        padding-bottom: 75%; 
      }
    `}</style>
    <div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
  <h1 className='mr-6 text-lg text-black font-bold'>Metamask- Your Gateway to Decentralised Finance</h1>
  <iframe className='px-4 py-4 mb-50 ' width="650" height="350" align="center" src="https://www.youtube.com/embed/BePiknrPSHk">
  </iframe>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
      </div>
  </div>
);

export default MyComponent;