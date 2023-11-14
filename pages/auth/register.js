import { Card, CardContent, Grid } from '@mui/material';
import RegistrationForm from '../../components/Register';
const API_URL = 'http://localhost:3001';


const  registerUser=async({name,email,password})=>{
    try {
        const response = await fetch(`${API_URL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email, password }),
        });
    
        if (response.status === 201) {
          
         window.location.href = '/auth/login';
        } else {
          console.log(response)
        }
      } catch (error) {
       console.log(error)
      }
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