import {useEffect, useState} from "react"
import Card from '@mui/material/Card';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';

// external libraries
import axios from "axios";
import moment from "moment/min/moment-with-locales"

import { useTranslation } from 'react-i18next';
moment.locale("ar");

export default function Weather() {

   const { t, i18n } = useTranslation();
   const apiKey = import.meta.env.VITE_API_KEY
   const baseUrl = import.meta.env.VITE_BASE_URL

  // ===== STATES =====//
  const [dateAndTime,setDateAndTime]=useState("")
  const [temp , setTemp] = useState(
    {
      number:null,
      description:"",
      min:null,
      max: null,
      feelsLike:null,
      icon:null,
      humidity:null,
      windSpeed:null,
    })
  const [locale, setLocal] = useState("ar")

  function handleLanguageClick(){
      if(locale == "en"){
        setLocal("ar")
        i18n.changeLanguage("ar")
        moment.locale("ar");

      }else{
        setLocal("en")
        i18n.changeLanguage("en")
        moment.locale("en");
      }
      setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'))

    } 

    useEffect(()=>{
      i18n.changeLanguage(locale)
    },[])

    useEffect(()=>{

    setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'))

    axios.get(`${baseUrl}${apiKey}`,
    {

      cancelToken:new axios.CancelToken((c)=>{
        cancelAxios = c
      })
    }
    )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp -272.15)
        const min = Math.round(response.data.main.temp_min -272.15)
        const max = Math.round(response.data.main.temp_max -272.15)
        const feelsLike = Math.round(response.data.main.feels_like -272.15)
        const description = response.data.weather[0].description
        const responseIcon = response.data.weather[0].icon
        const windSpeed = response.data.wind.speed
        const humidity = response.data.main.humidity 
        humidity

        setTemp({
          number:responseTemp,
          min:min,
          max:max,
          description:description,
          feelsLike:feelsLike,
          icon:`http://openweathermap.org/img/wn/${responseIcon}.png`,
          humidity:humidity,
          windSpeed:windSpeed,   
        })
            
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

      return ()=>{
        cancelAxios();
      }

      
  },[])

  let cancelAxios =null
  

  return (
    <>
       <div className="p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-none shadow-2xl rounded-lg">
         <div className="flex flex-col items-center">
            <h2 className="text-3xl mb-2">AL Argoub, Morocco</h2>
            <p className="text-sm opacity-90 mb-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="flex items-center justify-center mb-6">
              <img className="h-48" src={temp.icon}/>
            </div>
            <div className="text-6xl mb-2">{temp.number}°C</div>
            <p className="text-xl mb-6">{temp.description}</p>
            <p className="text-sm opacity-90 mb-8">Feels like {temp.feelsLike}°C</p>

            <div className="grid grid-cols-2 gap-8 w-full max-w-xs">
          <div className="flex items-center gap-3">
            <OpacityIcon className="w-6 h-6" />
            <div>
              <p className="text-sm opacity-80">Humidity</p>
              <p className="text-xl">{temp.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AirIcon className="w-6 h-6"/>
            <div>
              <p className="text-sm opacity-80">Wind Speed</p>
              <p className="text-xl">{temp.windSpeed} km/h</p>
            </div>
          </div>
        </div>
        </div>
       </div>
    </>
  )
}

