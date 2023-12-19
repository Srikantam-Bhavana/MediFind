import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import { Input } from '@mui/material';
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'
import { Typography } from '@mui/material';

const ReceiptAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prescribedItems, setprescribedItems] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const analyzeReceipt = async () => {
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

  return (
      <div style={{justifyItems:'center', justifyContent:'center'}}>
        <ThemeProvider theme={theme}>
        <Input type="file" color='primary' accept="image/*" onChange={handleFileChange} />
        <Button variant="contained" color='primary' onClick={analyzeReceipt}>Analyze Receipt</Button>
        
        {prescribedItems.length > 0 && (
          <div>
            <Typography color='primary' variant='h5' style={{padding:'5%'}}>Choose medicines to find generic alternatives and submit: </Typography>
              {prescribedItems.map((description, index) => (
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label={description} />
                </FormGroup>
              ))}
          </div>
          // <div style={{margin:30, justifyContent:'center'}} key={index}>
          // <input value={description} type="checkbox" />
          // {description}
          // </div>
        )}
        <Button>Submit</Button>
        </ThemeProvider>
      </div>
  );
};

export default ReceiptAnalyzer;
