import { TextField, Button } from "@mui/material";
export const RegistrationForm = () => {
  return (
    <form>
      <TextField label="Email" type="email" fullWidth />
      <TextField label="Password" type="password" fullWidth />
      <TextField label="Confirm Password" type="password" fullWidth />
      <Button variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </form>
  );
};
