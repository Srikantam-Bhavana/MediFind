import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { getFirestore, collection, addDoc} from 'firebase/firestore';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const token = localStorage.getItem('token');
  const history = useNavigate();

  React.useEffect(()=>{
    if(token === null){
      history("/");
    }
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = auth?.currentUser?.uid;
    const db = getFirestore();
    const data = {
      feedback,
      timestamp: new Date().toISOString(), 
      userId:userId
    };
    try {
      const docRef = await addDoc(collection(db, 'feedback'), data);
      console.log('Feedback added successfully with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding feedback:', error.message);
    }
    setFeedback('');
  };
  return (
    <ThemeProvider theme={theme}>
    <Navbar/>
    {token? <Container maxWidth="sm" style={{padding:"2%"}}>
      <Typography variant="h4" color="primary" gutterBottom>
        Feedback Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Your Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Submit Feedback
        </Button>
      </form>
    </Container>: " "}
    </ThemeProvider>
  );
};

export default Feedback;

