import { Card, CardContent, Grid } from "@mui/material";
import LoginForm from "../../components/Login";
const API_URL = "http://localhost:3001";

const authenticateUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      const token = data.token;
      sessionStorage.setItem("jwtToken", token);

      window.location.href = "/protected/updates";
    } else {
      // Handle login error, e.g., show error message to user
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};

function Login() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Card sx={{ width: 1 / 2 }}>
        <CardContent>
          <LoginForm onSubmit={authenticateUser} />
          {/* <RegistrationForm /> */}
          {/* Or use LoginForm */}
        </CardContent>
      </Card>
    </Grid>
  );
}
export default Login;
