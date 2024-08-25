import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
 
 







const Weather = () => {
  const [wcity, setWcity] = useState(false)
  const inputRef=useRef()

  const allicons ={
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n" : cloud_icon ,
    "03d": cloud_icon ,
    "03n": cloud_icon ,
    "04d":  drizzle_icon,
    "04n" : drizzle_icon ,
    "09n" : rain_icon,
    "09n" : rain_icon,
    "10d": rain_icon,
     "10n": rain_icon,
     "13d": snow_icon,
     "13n": snow_icon
     
}

    const fetchWeather = async (city) => {
      if(city===''){
        alert('Please enter city name')
        return;
      }
       try {
         
        const apiKey='02a82506b83657ebec5f9f81d33b1b90'
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        const data = await response.json()
        console.log(data)
        const icon= allicons[data.weather[0].icon] || clear_icon
        setWcity({
           name: data.name,
           temprature: data.main.temp,
           humidity: data.main.humidity,
           windspeed: data.wind.speed,
           feels : data.main.feels_like,
           icon: icon,
           description: data.weather[0].description, 

 
        })
       } catch (error) {
        console.error('Error')
       }
         
    }

    useEffect(()=>{
        fetchWeather();
    },[])

    const HandleKeyDown=(e)=>{
        if(e.key==='Enter'){
            fetchWeather(inputRef.current.value)
        }
    }

    
    
  return (
    <div className='flex justify-center   '>
        <div className='w-[300px] min-h-[360px] bg-slate-200 flex     justify-center mt-7 rounded-md '>
           <div className=' ' >
             <h1 className='mt-5 text-2xl text-center'>Weather App</h1>
             <div className='bg-slate-100 mt-4 pr-2 h-7 flex justify-around items-center'>
              <input onKeyDown={HandleKeyDown}  ref={inputRef} className='outline-none h-7 px-2' type="text" placeholder='Type Shahar Here' />
              <img onClick={()=>fetchWeather(inputRef.current.value)} className='bg-transparent h-5 hover:cursor-pointer pl-2' src={search_icon} alt="" />
               
             </div>
                 <div className='flex justify-around items-center mt-4'>
                    <p className='   text-2xl font-semibold'>{wcity.name}</p>
                    <p className=' text-2xl font-bold   '>{wcity.temprature} <span>°C</span> </p>
                 </div>
                 <div className='flex justify-center'>
                 <img  className='h-28 ' src={wcity.icon} alt="" />
                 </div>
               
             <div className='flex justify-around '>
             
             <p className='mt-1 '>Feels: {wcity.feels} °C</p>
  
             </div>
            <div className='flex justify-around'>
            <p className='mt-5 font-light'>Humidity: {wcity.humidity} %</p>
            <p className='mt-5 font-light'>Wind:{wcity.windspeed} km/h</p>

            </div>
             
           </div>
       </div>
    </div>
  )
}

export default Weather
