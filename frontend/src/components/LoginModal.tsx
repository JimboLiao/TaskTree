import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import ModalLogo from "./ModalLogo";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "100px",
});

interface LoginModalProps {
  onClose: () => void;
  isOpen?: boolean;
  onCreateAccount: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  isOpen = true,
  onCreateAccount,
}) => {
  const navigate = useNavigate();
  function handleLogin() {
    //@todo login
    console.log("login");
    navigate("/");
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
          <Typography fontSize="32px">Login to your Account</Typography>
          <Typography fontSize="16px">
            Welcome! Select a method to log in:
          </Typography>
        </Box>
        <Box display="flex" padding="0px 10px 30px 10px" justifyItems="center">
          <Button
            variant="outlined"
            startIcon={<GoogleIcon sx={{ color: "#DB4437" }} />}
            sx={{ color: "black", border: "1px solid #DB4437" }}
          >
            Login with Google
          </Button>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyItems="center"
          padding="0px 10px 30px 10px"
          width="100%"
        >
          <Typography fontSize="14px" color="#A5A5A5" textAlign="center">
            or continue with E-mail
          </Typography>
          <Divider />
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
            onClick={handleLogin}
            variant="contained"
            sx={{ bgcolor: "#027929", width: "100%" }}
          >
            login
          </Button>
        </Box>
        <Typography style={{ cursor: "pointer", textDecoration: "underline" }}>
          Forget password?
        </Typography>
        <Box paddingBottom="10px" />
        <Box
          display="flex"
          alignItems="baseline"
          justifyContent="space-between"
        >
          <Typography>Don't have an account?</Typography>
          <Box paddingRight="5px" />
          <Typography
            onClick={onCreateAccount}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Create an account.
          </Typography>
        </Box>
      </StyledContainer>
    </Modal>
  );
};

export default LoginModal;
