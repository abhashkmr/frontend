import { Card, CardContent, Grid } from '@mui/material';
import RegistrationForm from '../../components/Register';
import LoginForm from '../../components/Login';
const API_URL = 'http://localhost:3001';


const  registerUser=async({name,email,password})=>{
    // try {
    //     const response = await fetch(`${API_URL}/login`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ email, password }),
    //     });
    
    //     if (response.status === 200) {
    //      console.log('logged in')
    //      window.location.href = '/';
    //     } else {
    //       // Handle login error, e.g., show error message to user
    //     }
    //   } catch (error) {
    //    console.log(error)
    //   }
    console.log(name,email,password);
    };


function Register (){
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Card sx={{ width: 1/2 }}>
          <CardContent >
          {/* <LoginForm onSubmit={authenticateUser}/> */}
            <RegistrationForm onSubmit={registerUser} />
            {/* Or use LoginForm */}
          </CardContent>
        </Card>
      </Grid>
    );
  }
  export default Register