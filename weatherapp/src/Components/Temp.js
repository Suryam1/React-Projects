import React, { useEffect, useState } from 'react'
import './style.css'
import WeatherCard from './WeatherCard';
const Temp = () => {

    const [searchValue,setSearchValue]=useState("Bhilwara");

    const [tempInfo,setTempInfo]=useState({});

    const getWeatherInfo = async ()=>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3553247398b5b10b0d5745b3f38a925f`;

            const res=await fetch(url);
            const data=await res.json();
            console.log(data);

            const {temp,humidity,pressure}=data.main;
            const {main:weathermood}=data.weather[0]
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys
            

            const myNewWeatherInfo ={
                temp,humidity,pressure,weathermood,name,
                speed,
                country,sunset,
            }
            console.log(tempInfo);
            setTempInfo(myNewWeatherInfo);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getWeatherInfo();
    },[])

  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input type='search' placeholder='Enter City Name' autoFocus id='search' className='searchTerm' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
            <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
      </div>


        <WeatherCard {...tempInfo}/>
    </>
  )
}

export default Temp
