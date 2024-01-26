import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import { Input } from '@mui/material';
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'
import { Typography } from '@mui/material';
import GenericMedicines from './GenericMedicines';
import Navbar from './Navbar'


const ReceiptAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prescribedItems, setprescribedItems] = useState([]);
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [submit, setSubmit] = useState(false)
  const [analyze, setAnalyze] = useState(false)
  const [alternatives, setAlternatives] = useState([]);
  const [alternativesFound, setAlternativesFound] = useState(0);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const analyzeReceipt = async () => {
    setAnalyze(true)
    // console.log("analyze:", analyze);
    try {
      if (!selectedFile) {
        console.error("Please select a file.");
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:8000/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setprescribedItems(response.data.items);  
    } catch (error) {
      console.error("An error occurred:", error.message || error);
    }
  };

  const handleChange = (e) =>{
    const { value, checked } = e.target;
    // console.log(e.target);
    if (checked) {
      setCheckedOptions([...checkedOptions, value]);
    } else {
      setCheckedOptions(checkedOptions.filter((option) => option !== value));
    }
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setSubmit(true);
    const obj = {
      "medicines": checkedOptions,
    };
    const response = await axios.post("http://localhost:8000/api/searchAlternativesFromPrescription", obj);
    // console.log(response.data.alternatives);
    setAlternativesFound(Object.keys(response.data.alternatives).length);
    // for (const medicine in response.data.alternatives) {
      // console.log(`Medicine: ${medicine}`);
      // console.log(response.data.alternatives[medicine][0].price);
    // }
    setAlternatives(response.data.alternatives);
  }

  return (
    <ThemeProvider theme={theme}>
    <div>
      <Navbar/>
      <div style={{justifyItems:'center', justifyContent:'center', padding:"5%", paddingBottom:"0.5%"}}>
        
            <Input type="file" color='primary' accept="image/*" onChange={handleFileChange} />
            <Button variant="contained" color='primary' onClick={analyzeReceipt}>Analyze Receipt</Button>
            
            {prescribedItems.length > 0 ? 
              (<div>
                <form onSubmit={(e) => handleSubmit(e)}>
                <Typography color='primary' variant='h5' style={{padding:'2%'}}>Choose medicines to find generic alternatives and submit: </Typography>
                  {prescribedItems.map((description, index) => (
                    <FormGroup>
                      <FormControlLabel 
                      control={<Checkbox checked={checkedOptions.includes(description)}/>} 
                      label={description} 
                      value={description} 
                      onChange={handleChange}/>
                    </FormGroup>
                  ))}
                  <Button type='submit' variant="contained" >Submit</Button>
                  </form>
              </div> )             
             : (analyze ? 
              <div>
                Loading
              </div>
            : "")}
      </div>
      {submit ? 
            <div>
              <Typography color='primary' variant='h5' style={{padding:'2%'}}>Suitable Generic Alternatives found: </Typography>
              {/* <GenericMedicines props = {alternatives}/> */}
              {alternativesFound > 0 ? Object.keys(alternatives).map((medicine)=>(
                <div>
                <Typography color='primary' variant='h6' style={{padding:'2%'}}>{medicine}</Typography>
                {
                  // Array.from({ length: alternativesFound }, (_, i) => (
                    alternatives[medicine].length > 0?
                    <GenericMedicines  props = {alternatives[medicine]} />:<p>Generic Alternatives are not available for this medicine</p>
                    // <GenericMedicines  props = {[{
                    //   "title": "Augmentin 625 Duo Tablet",
                    //   "price": "MRP₹182.78",
                    //   "quantity": "strip of 10 tablets",
                    //   "manufacturingCompany": "Glaxo SmithKline Pharmaceuticals Ltd",
                    //   "description": "Amoxycillin (500mg) + Clavulanic Acid (125mg)",
                    //   "id": 2
                    // },{
                    //   "title": "Aricep 5 Tablet",
                    //   "price": "MRP₹118",
                    //   "quantity": "strip of 10 tablets",
                    //   "manufacturingCompany": "Eisai Pharmaceuticals India Pvt Ltd",
                    //   "description": "Donepezil (5mg)",
                    //   "id": 3
                    // }]} />
                  // ))
                }
                </div>
              )):""}
            </div>: "generic medicines will be displayed here"}
      </div>
      </ThemeProvider>
  );
};

export default ReceiptAnalyzer;
