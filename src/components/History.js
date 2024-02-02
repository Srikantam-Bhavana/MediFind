import React, { useEffect, useState } from 'react'
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'
// import { Typography } from '@mui/material';
import { database, auth } from '../firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';
import Navbar from './Navbar'
import { Table, TableBody, TableCell, TableRow, TableHead, TableContainer, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if(token === null){
      navigate("/");
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
      {token ? <div style={{justifyItems:'center', justifyContent:'center', paddingLeft:'20%', paddingRight:'20%', padding:'3%'}}>
        <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='h4' color='primary'>Prescribed Medicine</Typography></TableCell>
            <TableCell><Typography variant='h4' color='primary'>Alternative Choosen</Typography></TableCell>
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
              <TableCell >{row.AlternativeChoosen.map((alternative)=>(
                 <div style={{display:"inline"}}> {alternative} , </div>
              ))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
      </div>:""}
    </div>
  )
}

export default History