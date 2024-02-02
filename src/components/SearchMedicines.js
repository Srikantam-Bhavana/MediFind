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
    const [textBoxValue, setTextBoxValue] = useState();
    const [alternatives, setAlternatives] = useState([]);
    const [alternativesFound, setAlternativesFound] = useState(0);
    const [submit, setSubmit] = useState(false);
    const history = useNavigate();
    const token = localStorage.getItem('token');

  React.useEffect(()=>{
    if(token === null){
      history("/");
    }
  })

    const handleNoAlternatives = (medicine) =>{
      sessionStorage.setItem(medicine, JSON.stringify([{}]));
    }

    const handleSearch = async (e) => {
      if(textBoxValue!==undefined){
        setSubmit(true)
        e.preventDefault();
        sessionStorage.setItem("medicines", JSON.stringify([textBoxValue]));
        const obj = {
            "medicines": [textBoxValue],
        };
        setAlternativesFound(0);
        setAlternatives([]);
        const response = await axios.post("http://localhost:8000/api/searchAlternativesFromPrescription", obj);
        setAlternativesFound(Object.keys(response.data.alternatives).length);
        setAlternatives(response.data.alternatives);
        console.log(response.data.alternatives)
        if(alternativesFound>0){
          Object.keys(alternatives).map((medicine)=>{
            console.log(alternatives.medicine)
          })
        }
      }
      else{
        alert("please enter a medicine")
      }
    }
  return (
    <div>
        <Navbar/>
        {token?
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
                    <GenericMedicines  alternatives = {alternatives[medicine]} prescribed = {medicine} />:<p> {handleNoAlternatives(medicine)} Generic Alternatives are not available for this medicine</p>
                }
                </div>
              )):""}
              <Button variant='contained' onClick={()=>{
                  history("/FinalReceipt")
                }}>Click here to see the selected Alternatives</Button>
            </div>: "generic medicines will be displayed here"}

            </div>
        </ThemeProvider>: ""}
    </div>
  )
}

export default SearchMedicines