import React, { useState } from 'react'
import { database } from '../firebaseConfig';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import '../Styles/Styles.css';
import { FormControl, InputLabel, Input } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@mui/material/styles';
import Grow from '@mui/material/Grow';
import logo from '../MediFind.png';


const RegisterAndLogin = () => {

    const [login, setLogin] = useState(false)

    const history = useNavigate()

    const handleSubmit = (e, type) =>{
        e.preventDefault();
        // console.log(e.target.email.value);
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(type === 'SignUp'){
            createUserWithEmailAndPassword(database, email, password).then(data =>{
                console.log(data, "authData");
                history("/home");
            }).catch(err =>{
                alert(err.code)
                setLogin(true)
            })
        }else{
            signInWithEmailAndPassword(database, email, password).then(data =>{
                console.log(data, "authData");
                history("/home");
            }).catch(err =>{
                alert(err.code)
            })
        }
        
    }

    const handleForgotPassword = () =>{
        history("/reset");
    }

  return (
    <div className='App' style={{margin:30, justifyContent:'center'}}>
    <Grow in= {true} timeout={5000} sx={{padding: 0, margin: 0}}> 
          <img src= {logo}
              height={250} 
              width={250} 
          /> 
      </Grow>
        <form onSubmit={(e) => handleSubmit(e, login? "SignIn":"SignUp")} >
            <FormControl>
                <ThemeProvider theme={theme}>
                <Grid container spacing={2} sx={{justifyContent:'center'}}>
                    <Grid item xs={6}>
                        <Typography color='primary' className={login === false ? 'activeColor':'pointer'} variant="h6" onClick={()=>{setLogin(false)}} sx={{paddingLeft:'25%', paddingRight: '25%', paddingBottom:'5%'}}>Sign Up</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color='primary' className={login === true ? 'activeColor':'pointer'} variant="h6" onClick={()=>{setLogin(true)}}  sx={{paddingLeft:'25%', paddingRight: '25%', paddingBottom:'5%'}}>Sign In</Typography>
                    </Grid>
                </Grid>
                <h1 style={{ color: '#2ABBA7'}}>{login? 'Sign In': 'Sign Up'}</h1>
                <Input name = "email" type = "email" placeholder='Email Id'/><br/>
                <Input name = "password" type = "password" placeholder ='Password length 6 characters' sx={{ width: 350 }} /><br/>
                {/* style={{margin : 10, padding : 5}} */}
                <Button onClick={handleForgotPassword} color='primary'>Forgot Password?</Button> <br />
                <Button variant="contained" type="submit" color='primary'>{login? 'SignIn': 'SignUp'}</Button>
                </ThemeProvider>
            </FormControl>
        </form>
    </div>
  )
}

export default RegisterAndLogin