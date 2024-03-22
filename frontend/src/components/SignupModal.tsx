import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Modal from "./Modal";
import ModalLogo from "./ModalLogo";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "100px",
});

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
  //@todo sign up btn
  function handleSignup() {
    console.log("sign up");
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledContainer>
        <ModalLogo />
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
        <Box paddingBottom="20px">
          <Button
            onClick={handleSignup}
            variant="contained"
            sx={{ bgcolor: "#027929", width: "100%" }}
          >
            Sign up
          </Button>
        </Box>
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Typography>Already have an account?</Typography>
          <Box paddingRight="5px" />
          <Typography
            onClick={onLogin}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Log in.
          </Typography>
        </Box>
      </StyledContainer>
    </Modal>
  );
};

export default SignupModal;
