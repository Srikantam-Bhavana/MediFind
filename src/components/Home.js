import React from 'react'
import Navbar from './Navbar'
import '../Styles/Styles.css'
import {Typography} from '@mui/material'
import theme from '../Styles/colorTheme'
import { ThemeProvider } from '@emotion/react'
import Zoom from '@mui/material/Zoom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { Button, CardActionArea, CardActions } from '@mui/material';
import PrescriptionImg from '../prescription.jpg';
import SearchImg from '../searchImage.jpg';
 
const Home = () => {
    const history = useNavigate()

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

                <div style={{justifyItems:'center', justifyContent:'center', paddingLeft:"20%", paddingTop:"5%"}}>
                    {/* <ReceiptAnalyzer/> */}
                    <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={PrescriptionImg}
                        alt="prescription"
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.primary">
                            Please Upload The Printed Prescription given by the doctor.
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => history("/uploadPrescription")}>
                        Upload
                        </Button>
                    </CardActions>
                    </Card>
                </div>
                    
                </div>
                <div className='bottomPane'style={{justifyItems:'center', justifyContent:'center', padding:'5%'}}>
                    <Zoom in={true} style={{ transitionDelay:'500ms'}}>
                        <Typography variant='h4' color='secondary'>
                            Search Medicines
                        </Typography>
                    </Zoom>
                     
                    <div style={{justifyItems:'center', justifyContent:'center', paddingLeft:"20%", paddingTop:"5%"}}>
                        {/* <SearchMedicines/> */}
                        <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={SearchImg}
                        alt="search medicine"
                        />
                        <CardContent>
                        <Typography variant="body2" color="text.primary">
                            Please type your medicine name in the search bar carefully.
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => history("/searchMedicine")}>
                        Search
                        </Button>
                    </CardActions>
                    </Card>
                    </div>
                </div>
            </div>
            </ThemeProvider>
        </div>
    )
}

export default Home