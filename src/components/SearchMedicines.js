import React, { useState } from 'react';
import axios from 'axios';
import {Button, Input, FormControl} from '@mui/material'
import Navbar from './Navbar';
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'
import { Typography } from '@mui/material';
import GenericMedicines from './GenericMedicines';
import { useNavigate } from 'react-router-dom';

const TextBoxStyle = {
    display: "flex",
    flexDirection: "row",
    paddingLeft:"20%",
    paddingTop :"5%"
  };

const ButtonStyle = {
    paddingTop: "2%"
}

const SearchMedicines = () => {
    const [textBoxValue, setTextBoxValue] = React.useState();
    const [alternatives, setAlternatives] = useState([]);
    const [alternativesFound, setAlternativesFound] = useState(0);
    const [submit, setSubmit] = useState(false);
    const history = useNavigate();

  React.useEffect(()=>{
    if(!sessionStorage.getItem("isLoggedIn")){
      history("/");
    }
  })

    const handleSearch = async (e) => {
        setSubmit(true)
        e.preventDefault();
        console.log(textBoxValue);
        const obj = {
            "medicines": [textBoxValue],
        };
        const response = await axios.post("http://localhost:8000/api/searchAlternativesFromPrescription", obj);
        setAlternativesFound(Object.keys(response.data.alternatives).length);
        setAlternatives(response.data.alternatives);
        console.log(response.data.alternatives)
        console.log("sahitya")
        if(alternativesFound>0){
          Object.keys(alternatives).map((medicine)=>{
            // if(alternatives[medicine].length > 0){
            //   console.log("alternatives[medicine]")
            // }
            console.log(alternatives.medicine)
          })
        }
    }
  return (
    <div>
        <Navbar/>
        <ThemeProvider theme={theme}>
            <div style={{padding:"2%"}}>
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
        {submit ? 
            <div>
              <Typography color='primary' variant='h5' style={{padding:'2%'}}>Suitable Generic Alternatives found: </Typography>
              {alternativesFound > 0 ? Object.keys(alternatives).map((medicine)=>(
                <div>
                <Typography color='primary' variant='h6' style={{padding:'2%'}}>{medicine}</Typography>
                {
                    alternatives[medicine].length > 0?
                    <GenericMedicines  props = {alternatives[medicine]} />:<p>Generic Alternatives are not available for this medicine</p>
                }
                </div>
              )):""}
            </div>:
            <div style={{padding:"2%"}}><Typography> generic medicines will be displayed here </Typography> </div>}
            </div>
        </ThemeProvider>
    </div>
  )
}

export default SearchMedicines