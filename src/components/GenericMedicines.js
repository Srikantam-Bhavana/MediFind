import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Button, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Typography } from '@mui/material';
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'
import { addDoc } from 'firebase/firestore';
import { database, auth } from '../firebaseConfig';
import { collection } from 'firebase/firestore';

const GenericMedicines = ({alternatives, prescribed}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState(alternatives);
    const [checkedOptions, setCheckedOptions] = useState([]);
    const [checkedOptionDetails, setCheckedOptionDetails] = useState([]);
    const [submit, setSubmit] = useState(false);
    const historyCollectionRef = collection(database, "userHistory");
    const headings = ["title", "cost", "dosage", "manufacturer", "composition", "select"]
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    useEffect(()=>{
      console.log("checked option details updated");
      console.log(checkedOptionDetails)
      console.log("session");
      sessionStorage.setItem(prescribed, JSON.stringify(checkedOptionDetails));
      console.log(sessionStorage.getItem(prescribed));
    }, [checkedOptionDetails])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChange = (e) =>{
      const { value, checked } = e.target;
      console.log(e.target);
      if (checked) {
        setCheckedOptions([...checkedOptions, value]);
      } else {
        setCheckedOptions(checkedOptions.filter((option) => option !== value));
      }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSubmit = async (e) =>{
      e.preventDefault();
      checkedOptions.map((option)=>{
        const optionDetails = alternatives.filter(alternative => alternative.title === option);
        console.log(optionDetails);
        setCheckedOptionDetails((checkedOptionDetails) => [...checkedOptionDetails, optionDetails]);
      })
      console.log(checkedOptionDetails);
      
      if(checkedOptions.length !== 0){
        try{
          await addDoc(historyCollectionRef, {
            PrescribedMedicine: prescribed,
            AlternativeChoosen: checkedOptions,
            userId: auth?.currentUser?.uid,
          });
          setSubmit(true);
          } catch(err){
            console.log(err);
          }
      }
      else{
        alert("Please choose at least one alternative and submit");
      }
    };

  return (
    <div style={{justifyItems:'center', justifyContent:'center', paddingLeft:'5%', paddingRight:'5%'}}>
        { !submit ? <ThemeProvider theme={theme}>
        <Root sx={{ maxWidth: '100%' }}>
        {/* <form onSubmit={(e)=>{
          console.log("sahitya");
          handleSubmit(e);
        }}> */}
            <table aria-label="generic medicine alternatives">
                <thead>
                <tr>
                    {headings.map(head =>(
                        <th>
                            <Typography color='primary' variant='h5'>
                            {head}
                            </Typography>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                ).map((row) => (
                    <tr key={row.title}>
                    {/* <FormGroup> */}
                    <td style={{width: 300}}>
                      {row.title}
                    </td>
                    <td style={{width: 300}}  align="right">
                        {row.cost}
                    </td>
                    <td style={{width: 300}}  align="right">
                        {row.dosage}
                    </td>
                    <td style={{width: 300}}  align="right">
                        {row.manufacturer}
                    </td>
                    <td style={{width: 300}}  align="right">
                        {row.composition}
                    </td>
                    <td>
                    
                      <FormControlLabel 
                      control={<Checkbox checked={checkedOptions.includes(row.title)}/>}  
                      value={row.title} 
                      onChange={handleChange}/>
                    
                    </td>
                    {/* </FormGroup> */}
                    </tr>
                ))}
                {emptyRows > 0 && (
                    <tr style={{ height: 34 * emptyRows }}>
                    <td colSpan={5} aria-hidden />
                    </tr>
                )}
                </tbody>
                <tfoot>
                <tr>
                    <CustomTablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={5}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotalternatives={{
                        select: {
                        'aria-label': 'rows per page',
                        },
                        actions: {
                        showFirstButton: true,
                        showLastButton: true,
                        slots: {
                            firstPageIcon: FirstPageRoundedIcon,
                            lastPageIcon: LastPageRoundedIcon,
                            nextPageIcon: ChevronRightRoundedIcon,
                            backPageIcon: ChevronLeftRoundedIcon,
                        },
                        },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {/* <form onSubmit={(e)=>{
                      console.log("sahitya");
                      handleSubmit(e);
                    }}> */}
                    <Button type='submit' variant="contained" onClick={handleSubmit}>Submit</Button>
                    {/* </form> */}
                </tr>
                </tfoot>
            </table>
          {/* </form> */}
        </Root>
        </ThemeProvider> : <div>Alternative submitted</div>}
    </div>
  )
}


const CustomTablePagination = styled(TablePagination)(
    ({ theme }) => `
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.toolbar}  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      padding: 3px 0;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.select}{
      font-family: 'IBM Plex Sans', sans-serif;
      padding: 2px 0 2px 4px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      border-radius: 6px; 
      background-color: transparent;
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      transition: all 100ms ease;
  
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:focus {
        outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
        border-color: ${blue[400]};
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      display: flex;
      gap: 6px;
      border: transparent;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      display: flex;
      align-items: center;
      padding: 0;
      border: transparent;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
      transition: all 120ms ease;
  
      > svg {
        font-size: 22px;
      }
  
      &:hover {
        background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      }
  
      &:focus {
        outline: 3px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
        border-color: ${blue[400]};
      }
  
      &:disabled {
        opacity: 0.3;
        &:hover {
          border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
          background-color: transparent;
        }
      }
    }
    `,
  );

  const blue = {
    50: '#F0F7FF',
    200: '#A5D8FF',
    400: '#3399FF',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Root = styled('div')(
    ({ theme }) => `
    border-radius: 12px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    overflow: clip;
  
    table {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      border: none;
      // width: 500px;
      margin: -1px;
    }
  
    td,
    th {
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      text-align: left;
      padding: 8px;
    }
  
    `,
  );

export default GenericMedicines