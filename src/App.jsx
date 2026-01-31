import { createTheme,ThemeProvider } from "@mui/material/styles";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';


const theme =createTheme({
  typography:{
    fontFamily:["IBM"]
  }
})

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* card */}
          <div 
            dir="rtl"
            style={{
              width:"500px",
              background:"rgb(28 52 91 / 36%)",
              borderRadius:"15px",
              padding :"10px", 
              boxShadow:"0px 11px 1px rgba(0,0,0,0.05)"}}
            >
            {/* city & time */}
              <div style={{display:"flex", alignItems:"end" , justifyContent: "start"}} dir="rtl">
                <Typography variant="h2" style={{marginRight:"10px",fontWeight:"600"}}>
                  الراشيدية
                </Typography>
                <Typography variant="h5" style={{marginRight:"15px"}}>
                  الاحد 31-01-2025
                </Typography>
              </div>
            {/*=== city & time ===*/}
              <hr/>
            {/* container temp & degre */}
              <div style={{display:"flex" ,justifyContent:"space-around"}}>
                {/* temp & description */}
                <div>
                  <Typography variant="h1" style={{textAlign:"right"}}>
                    38
                  </Typography>
                  <Typography variant="h6" style={{textAlign:"right"}}>
                    broken clouds
                  </Typography>
                  <div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
                    <h5>الصغري:34</h5>
                    <h5 style={{margin:"0 5px"}}> | </h5>
                    <h5>الكبرى:34</h5>
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
        <div style={{marginTop:"20px"}}>
          <Button variant="text" style={{color:"white"}}>انجليزي</Button>
        </div>
        {/* translation container */}
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
