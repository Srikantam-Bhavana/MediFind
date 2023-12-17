import React from 'react'
import Navbar from './Navbar'
import '../Styles/Styles.css'
import {Typography} from '@mui/material'
import theme from '../Styles/colorTheme'
import { ThemeProvider } from '@emotion/react'
import Zoom from '@mui/material/Zoom';
import ReceiptAnalyzer from './ReceiptAnalyzer'

const Home = () => {
    
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
                    
                </div>
            </div>
            </ThemeProvider>
        </div>
    )
}

export default Home