import React from 'react'
import Navbar from './Navbar'
import '../Styles/Styles.css'
import {Button, Typography, Input, FormControl} from '@mui/material'
import theme from '../Styles/colorTheme'
import { ThemeProvider } from '@emotion/react'
import Zoom from '@mui/material/Zoom';
import ReceiptAnalyzer from './ReceiptAnalyzer'

const TextBoxStyle = {
    display: "flex",
    flexDirection: "row",
    paddingTop: "3%",
    paddingLeft:"20%"
  };

const ButtonStyle = {
    paddingTop: "2%"
} 
const Home = () => {
    const [textBoxValue, setTextBoxValue] = React.useState();
    const handleSearch = (e) => {
        //post
        e.preventDefault();
        console.log(textBoxValue);
        // axios.post("",textBoxValue)
        // .then((res) => {
        //     console.log(res);
        // })
    }
    return (
        <div>
            <Navbar/>
            <ThemeProvider theme={theme}>
            <div className='splitScreen'>
                <div className='topPane' style={{justifyItems:'center', justifyContent:'center', padding:'5%'}}>
                <Zoom in={true} style={{ transitionDelay:'500ms'}}>
                    <Typography variant='h4' color='secondary'>
                        Upload Prescription
                    </Typography>
                </Zoom>

                <div style={{justifyItems:'center', justifyContent:'center', padding:'5%'}}>
                    <ReceiptAnalyzer/>
                </div>
                    
                </div>
                <div className='bottomPane'style={{justifyItems:'center', justifyContent:'center', padding:'5%'}}>
                    <Zoom in={true} style={{ transitionDelay:'500ms'}}>
                        <Typography variant='h4' color='secondary'>
                            Search Medicines
                        </Typography>
                    </Zoom>
                    <form onSubmit={(e) => handleSearch(e)}>
                        <FormControl>
                        <div style={TextBoxStyle}>
                            <Input name = "Search" type = "text" placeholder='Enter you input' onChange={(e) => setTextBoxValue(e.target.value)}/><br/>
                            <div style={ButtonStyle}>
                                <Button variant="contained" type="submit">Search</Button>
                            </div> 
                        </div>
                        </FormControl>
                    </form>  
                </div>
            </div>
            </ThemeProvider>
        </div>
    )
}

export default Home