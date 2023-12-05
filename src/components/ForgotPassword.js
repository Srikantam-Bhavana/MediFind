import React from 'react'
import { database } from '../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Input } from '@mui/material';
import Button from '@mui/material/Button';

const ForgotPassword = () => {

    const history = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const emailval = e.target.email.value;
        sendPasswordResetEmail(database, emailval).then(data =>{
            alert("check your registered email inbox to reset the password")
        }).catch(err =>{
            alert(err.code)
            history('/'); 
        })
    }

    return (
        <div className='App' style={{ margin: 10 }}>
            <h2>ForgotPassword</h2>
            <FormControl onSubmit = {(e) => handleSubmit(e)}>
                <InputLabel>Email Id</InputLabel>
                <Input name = 'email'/> <br/><br/>
                <Button variant="contained">Reset</Button>
            </FormControl>
        </div>
    )
}

export default ForgotPassword