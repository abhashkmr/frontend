import { useEffect, useState } from "react";
import { TextField, Button, Grid, Box, Typography, Link } from "@mui/material";
import { LoginFormWrapper } from "./styles";



function LoginForm({onSubmit}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  }


  return (
    <LoginFormWrapper>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box sx={{ flexGrow: 1 }} justifyContent="center">
      <form onSubmit={handleSubmit}>
        <Grid container direction={"column"} spacing={4}>
          <Grid item xs={8}>
            
            <TextField
              label="Email"
              type="email"
              fullWidth
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
           
          </Grid>
          
        </Grid>
        </form>
        <Grid container direction={"row"}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
      </Box>
    </LoginFormWrapper>
  );
}

export default LoginForm;
