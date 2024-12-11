import React, { useEffect, useState } from 'react'

const App = () => {
  const [countries,SetCountries] = useState([])
  
  const[states,setStates] = useState([]);

  const[cities,setCities] = useState([]);

  const [selCountry,setSelCountry] = useState("")
  const [selState,setSelState] = useState("")
  const [selCity,setSelCity] = useState("")


  useEffect(()=>{
  fetch("https://crio-location-selector.onrender.com/countries")
  .then((res) => res.json())
  .then((data) => SetCountries(data));
},[]);

useEffect(()=> {
  if(!selCountry)
    return
fetch(`https://crio-location-selector.onrender.com/country=${selCountry}/states`)
.then((res) => res.json())
.then((data) => setStates(data));
},[selCountry]);


useEffect(()=> {
  if(!selState)
    return
fetch(`https://crio-location-selector.onrender.com/country=${selCountry}/state=${selState}/cities`)
.then((res) => res.json())
.then((data) => setCities(data));
},[selState]);


console.log(selCountry,selState);
  return (
    <div>
    <select 
    name="countries" 
    id="countries" 
    value={selCountry} 
    onChange={(e)=>setSelCountry(e.target.value)}>

  {countries.map(country=> <option value ={country}key={country}>{country}</option>)}

    </select>

    <select 
    name="country" 
    id="country" 
    value={selState} 
    onChange={(e)=>setSelState(e.target.value)}>

  <option >Select State</option>

  {states.map((state)=> 
  <option value ={state} key={state}>{state}</option>)}

    </select>

    <select 
    name="cities" 
    id="cities" 
    value={selCity} 
    onChange={(e)=>setCities(e.target.value)}>

  <option >Select City</option>

  {cities.map((city)=> 
  <option value ={city} key={city}>{city}</option>)}

    </select>

    <h2>"You Selected ${selCity}, ${selState}, ${selCountry}":</h2>

    </div>
  )
}

export default App