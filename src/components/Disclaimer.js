import React from 'react'
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'
import { Button, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";


const Disclaimer = () => {
    const navigate = useNavigate();
    // const history = useNavigate()

    const handleSubmit = () =>{
        navigate("/home");
    }

  return (
    <div style={{justifyItems:'center', justifyContent:'center'}}>
        <ThemeProvider theme={theme}>
            <Typography variant='h4' color='primary'> Terms and Conditions: </Typography>
            <form onSubmit={handleSubmit}>
                <div style={{ paddingLeft:'25%',paddingTop:'5%',paddingBottom:'5%', justifyContent:'center', width:'50%', height: '50%'}}>
                <Typography variant='h6'>no medical advice; informations is not an alternative to medical advice</Typography>
                </div>
                <FormControlLabel required control={<Checkbox />} label="By clicking here, I state that I have read, understood and agree to the terms and conditions" />
                <br/>
                <Button variant="contained" type="submit">Submit</Button>
            </form>
            
        </ThemeProvider>
        
    </div>
  )
}

export default Disclaimer