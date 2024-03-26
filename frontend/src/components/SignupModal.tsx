import { Box, Stack, TextField, Typography } from "@mui/material";
import Modal from "./Modal";

interface SignupModalProps {
  onClose: () => void;
  isOpen?: boolean;
  onLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  onClose,
  isOpen = true,
  onLogin,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box
        display="flex"
        flexDirection="column"
        padding="0px 10px 30px 10px"
        width="100%"
      >
        <Typography fontSize="32px">Sign up</Typography>
        <Typography fontSize="16px">
          Welcome! Sign up with your E-mail:
        </Typography>
      </Box>
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
            InputProps={{
              style: { borderRadius: "25px", height: "50px" },
            }}
          />
        </Stack>
      </Box>
      <Box display="flex" alignItems="baseline" justifyContent="space-between">
        <Typography>Already have an account?</Typography>
        <Box paddingRight="5px" />
        <Typography
          onClick={onLogin}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Log in.
        </Typography>
      </Box>
    </Modal>
  );
};

export default SignupModal;
