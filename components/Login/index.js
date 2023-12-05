import * as React from 'react';
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { LoginWrapper } from './style';


function LoginForm({onSubmit}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  }

  return (
    // <Container component="main" maxWidth="xs">
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //       {/* <LockOutlinedIcon /> */}
    //     </Avatar>
    //     <Typography component="h1" variant="h5">
    //       Sign In
    //     </Typography>
    //     <Box sx={{ mt: 3 }}>
    //     {/* <LoginWrapper > */}
    //       <Grid container spacing={2}>
    //         <Grid item xs={12}>
    //           <TextField
    //             required
    //             fullWidth
    //             id="email"
    //             type="email"
    //             pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    //             label="Email Address"
    //             name="email"
    //             autoComplete="email"
    //             onChange={(e) => {
    //                 setEmail(e.target.value);
    //             }}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             required
    //             fullWidth
    //             name="password"
    //             label="Password"
    //             type="password"
    //             id="password"
    //             autoComplete="password"
    //             onChange={(e) => {
    //                 setPassword(e.target.value);
    //             }}
    //           />
    //         </Grid>
    //       </Grid>
    //       <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
    //         Sign In
    //       </Button>
    //       {/* </LoginWrapper> */}
    //       <Grid container justifyContent="flex-end">
    //         <Grid item>
    //           <Link href="/auth/register" variant="body2">
    //             {`Don't have an account? Register`}
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Box>
    //   {/* <Copyright sx={{ mt: 5 }} /> */}
    // </Container>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/register" variant="body2">
                {`Don't have an account? Register`}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
);
}

export default LoginForm;
