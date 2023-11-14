// pages/index.tsx

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import Image from 'next/image';

const landingPageStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  title: {
    marginBottom: '16px',
  },
  description: {
    marginBottom: '32px',
  },
  button: {
    textDecoration: 'none',
  },
};

const LandingPage = () => {
  return (
    <Container style={landingPageStyle.container}>
      <Image src='/owl.svg' alt='owl image' width={100} height={100}/>
      <Typography variant="h2" style={landingPageStyle.title}>
        Daily Updates Portal
      </Typography>
      <Typography variant="h5" style={landingPageStyle.description}>
       Post Daily Updates & track your progress.
      </Typography>
      <Button variant="contained" color="primary" href="/auth/login" style={landingPageStyle.button}>
        Explore Now
      </Button>
    </Container>
  );
};

export default LandingPage;
