import { Box, Button, Divider, Typography, styled } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import ModalLogo from "./ModalLogo";
import { useUserContext } from "../contexts/UserContext";
import LoginSignupForm from "./LoginSignupForm";

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
  const { login, googleLogin } = useUserContext();
  const navigate = useNavigate();

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
            onClick={handleGoogleLogin}
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
        <LoginSignupForm buttonText="login" onButton={handleLogin} />
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

  function handleLogin(email: string, password: string) {
    login(email, password)
      .then(() => {
        navigate("/workspace/dayview");
      })
      .catch((err) => {
        console.error(err);
        onClose();
      });
  }

  function handleGoogleLogin() {
    googleLogin()
      .then((url) => {
        // open a new tab
        const newWindow = window.open(url, "_blank", "noopener,noreferrer");
        if (newWindow) newWindow.opener = null;
      })
      .catch((err) => {
        console.error(err);
        onClose();
      });
  }
};

export default LoginModal;
