import React, { useState } from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';
import theme from '../Styles/colorTheme';
import { ThemeProvider } from '@emotion/react'
import Navbar from './Navbar';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      feedback,
      timestamp: new Date().toISOString() 
    };
    try {
      const response = await fetch('https://medifind-b308b-default-rtdb.firebaseio.com/feedback.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Feedback added successfully');
      } else {
        console.error('Error adding feedback:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding feedback:', error.message);
    }
    setFeedback('');
  };
  return (
    <ThemeProvider theme={theme}>
    <Navbar/>
    <Container maxWidth="sm" style={{padding:"2%"}}>
      <Typography variant="h4" gutterBottom>
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
    </Container>
    </ThemeProvider>
  );
};

export default Feedback;

