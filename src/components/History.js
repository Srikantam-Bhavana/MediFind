import React, { useEffect, useState } from 'react'
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'
// import { Typography } from '@mui/material';
import { database, auth } from '../firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';
import Navbar from './Navbar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(()=>{
    if(!sessionStorage.getItem("isLoggedIn")){
      history("/");
    }
    console.log("entered history");
    const userId = auth?.currentUser?.uid;
    const historyCollectionRef = collection(database, "userHistory");
    if(userId!=undefined){
      const q = query(historyCollectionRef, where('userId', '==', userId));
      const getList = async () =>{
      try{
        const data = await getDocs(q);
        // console.log(data);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
           id: doc.id,
        
        }))
        console.log(filteredData);
        setHistory(filteredData);
      }catch (err){
        console.log(err);
      }
    }
    getList();
    }
    
  }, [])
  return (
    <div>
      <Navbar />
      <div style={{justifyItems:'center', justifyContent:'center', paddingLeft:'15%', paddingRight:'15%', padding:'10%'}}>
        <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Prescribed Medicine</TableCell>
            <TableCell align="right">Alternative Choosen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((row) => (
            <TableRow
              key={row.PrescribedMedicine}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.PrescribedMedicine}
              </TableCell>
              <TableCell align="right">{row.AlternativeChoosen}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
      </div>
    </div>
  )
}

export default History