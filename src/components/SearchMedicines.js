import React from 'react'
import {Button, Input, FormControl} from '@mui/material'
import Navbar from './Navbar';
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'

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
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(textBoxValue);
        // axios.post("",textBoxValue)
        // .then((res) => {
        //     console.log(res);
        // })
        // history("/genericMedicines",[{
        //     "title": "Augmentin 625 Duo Tablet",
        //     "price": "MRP₹182.78",
        //     "quantity": "strip of 10 tablets",
        //     "manufacturingCompany": "Glaxo SmithKline Pharmaceuticals Ltd",
        //     "description": "Amoxycillin (500mg) + Clavulanic Acid (125mg)",
        //     "id": 2
        //   }]);
    }
  return (
    <div>
        <Navbar/>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    </div>
  )
}

export default SearchMedicines