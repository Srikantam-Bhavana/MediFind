import React, { useEffect, useState } from 'react'
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'
import { Table, TableBody, TableCell, TableRow, TableHead, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const FinalReceipt = () => {
    const givenMedicines = JSON.parse(sessionStorage.getItem("medicines"));
    const history = useNavigate();
    useEffect(()=>{
        if(!sessionStorage.getItem("isLoggedIn")){
            history("/");
        }
    }, [])
  return (
    <div>
  <Navbar />
  <ThemeProvider theme={theme}>
    <div style={{padding:"5%"}}>
  {givenMedicines.map((medicine) => {
    const alternatives = JSON.parse(sessionStorage.getItem(medicine));
    console.log(alternatives);
    return (
      <div key={medicine}>
        <Typography variant='h4' color='primary'>Medicine: {medicine}</Typography>
        {alternatives && (
          <div style={{paddingLeft:'25%', paddingRight:'25%', paddingTop:'2%', paddingBottom:'2%'}}>
            <Typography variant='h5' color='primary'>Alternatives</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant='h5' color='primary'>Title</Typography></TableCell>
                  <TableCell><Typography variant='h5' color='primary'>Cost</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
            {alternatives.map((alternative) => (
              <TableRow>
                <TableCell>
                  {alternative[0].title}
                </TableCell>
                <TableCell>
                  {alternative[0].cost} 
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
            </Table>
          </div>
        )}
      </div>
    );
  })}
  </div>
  </ThemeProvider>
</div>
  )
}

export default FinalReceipt