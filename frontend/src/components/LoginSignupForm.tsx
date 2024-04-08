import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface LoginSignupFormProps {
  onButton: (email: string, password: string) => void;
  buttonText: string;
}

const LoginSignupForm: React.FC<LoginSignupFormProps> = ({
  onButton,
  buttonText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        width="100%"
        sx={{ paddingBottom: "20px" }}
      >
        <Stack spacing={1}>
          <TextField
            required
            id="email"
            label="E-mail"
            type="email"
            value={email}
            onChange={handleChangeEmail}
            InputProps={{
              style: {
                borderRadius: "25px",
                height: "50px",
                width: "100%",
              },
            }}
          />

          <TextField
            required
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            InputProps={{
              style: { borderRadius: "25px", height: "50px" },
            }}
          />
        </Stack>
      </Box>
      <Box paddingBottom="20px">
        <Button
          onClick={handleButtonClick}
          variant="contained"
          sx={{ bgcolor: "#027929", width: "100%" }}
        >
          {buttonText}
        </Button>
      </Box>
    </>
  );

  function handleButtonClick() {
    if (email !== "" && password !== "") {
      onButton(email, password);
    } else {
      alert("Email and password must be provided");
    }
  }

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
};

export default LoginSignupForm;
