import React from 'react'
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Input } from '@mui/material';
import Button from '@mui/material/Button';

const ForgotPassword = () => {


    const history = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        let emailval =  e.target.email.value;
        console.log(emailval);
        sendPasswordResetEmail(auth, emailval).then(data =>{
            console.log(data);
            alert("check your registered email inbox to reset the password")
        }).catch(err =>{
            alert(err.code)
            history('/'); 
        })
    }

    return (
        <div className='App' style={{ margin: 10 }}>
            <h2>ForgotPassword</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormControl>
                    <InputLabel>Email Id</InputLabel>
                    <Input name = "email" type = "email" placeholder='Email Id'/> <br/><br/>
                    <Button variant="contained" type="submit">Reset</Button>
                </FormControl>
            </form>
        </div>
    )
}

export default ForgotPassword