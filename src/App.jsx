import {useEffect, useState} from "react"


// material ui
import { createTheme,ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';

// external libraries
import axios from "axios";
import moment from "moment/min/moment-with-locales"

import { useTranslation } from 'react-i18next';

moment.locale("ar");


const theme =createTheme({
  typography:{
    fontFamily:["IBM"]
  }
})

let cancelAxios =null

function App() {

  const { t, i18n } = useTranslation();

  // ===== STATES =====//
  const [dateAndTime,setDateAndTime]=useState("")
  const [temp , setTemp] = useState(
    {
      number:null,
      description:"",
      min:null,
      max: null,
      icon:null,
    })
  const [locale, setLocal] = useState("ar")

    // ======== EVENT HANDLERS =====//

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

    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=31.7500&lon=-4.5000&appid=641ed9e18a9a0933c63051ca7f2e8e8a',
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
        const description = response.data.weather[0].description
        const responseIcon = response.data.weather[0].icon

        setTemp({number:responseTemp,min:min,max:max,description:description,icon:`http://openweathermap.org/img/wn/${responseIcon}.png`})        
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

      return ()=>{
        cancelAxios();
      }

      
  },[])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* card */}
          <div 
            dir={locale=="ar"?"rtl":"ltr"}
            style={{
              width:"100%",
              background:"rgb(28 52 91 / 36%)",
              borderRadius:"15px",
              padding :"10px", 
              boxShadow:"0px 11px 1px rgba(0,0,0,0.05)"}}
            >
            {/* city & time */}
              <div style={{display:"flex", alignItems:"end" , justifyContent: "start"}} dir={locale=="ar"?"rtl":"ltr"}>
                <Typography variant="h2" style={{marginRight:"10px",fontWeight:"600"}}>
                  {t("Errachidia")}
                </Typography>
                <Typography variant="h6" style={{marginRight:"15px"}}>
                  {dateAndTime}
                </Typography>
              </div>
            {/*=== city & time ===*/}
              <hr/>
            {/* container temp & degre */}
              <div style={{display:"flex" ,justifyContent:"space-around"}}>
                {/* temp & description */}
                <div>
                  <div style={{display:"flex" ,justifyContent:"center", alignItems:"center"}}>
                    <Typography variant="h1" style={{textAlign:"right"}}>
                      {temp.number}
                    </Typography>
                    <img src={temp.icon}/>
                  </div>
                  <Typography variant="h6" style={{textAlign:"right"}}>
                    {t(temp.description)}
                  </Typography>
                  <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
                    <h5>{t("min")}:{temp.min}</h5>
                    <h5 style={{margin:"0 5px"}}> | </h5>
                    <h5>{t("max")}:{temp.max}</h5>
                  </div>
                </div>
                {/*=== temp & description === */}

                {/* cloud */}
                <div>
                  <CloudIcon style={{fontSize:"200px"}}/>
                </div>
                {/*=== cloud ===*/}
              </div>
            {/*=== container temp & degre === */}

            
        </div>
        {/*=== card ===*/}

        {/* translation container */}
        <div dir={locale=="ar"?"rtl":"ltr"} style={{width:"100%",display:"flex",justifyContent:"end",marginTop:"20px"}}>
          <Button
           variant="text" 
           style={{color:"white"}} 
           onClick={handleLanguageClick}>{locale=="en" ? "Arabic":"انجليزي"}
          </Button>
        </div>
        {/* translation container */}
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
