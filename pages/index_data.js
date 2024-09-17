import { useState, useEffect } from 'react'; 

export default function Home() { 
const [allData, setAllData] = useState([]); 
const [showAllData, setShowAllData] = useState(false); // New state variable 

let var1 = "Red Beauty";

const fetchAllData = async () => { 
  const response = await fetch('/api/getBusinessData'); 
	if (response.ok) { 
	const data = await response.json(); 

  let filteredArrayValues = data
    .filter(item => item.inputName === var1)
  console.log(filteredArrayValues[0].inputEmail);
 
	setAllData(data); 
 
	setShowAllData(true); 
	} else { 
	alert('Failed to fetch data!'); 
	} 
}; 

return ( 
	<div> 
	<button onClick={fetchAllData}>Get All Data</button> {/* Call fetchAllData on button click */} 
		
	{/* Conditionally render the div based on the state */} 
	{showAllData && ( 
		<div> 
		<h2>All Data</h2> 
		
		</div> 
	)} 
	</div> 
); 
}