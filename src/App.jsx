import Test from "./Weather"
import { createTheme,ThemeProvider } from "@mui/material/styles"


const theme =createTheme({
  typography:{
    fontFamily:["IBM"]
  }
})

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Test/>
      </ThemeProvider>
    </>
  )
}

export default App
