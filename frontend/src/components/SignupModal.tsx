import { Box, Button, Divider, Typography, styled } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Modal from "./Modal";
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
  const { signup, googleLogin } = useUserContext();

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
            Welcome! Select a method to sign up:
          </Typography>
        </Box>
        <Box display="flex" padding="0px 10px 30px 10px" justifyItems="center">
          <Button
            variant="outlined"
            startIcon={<GoogleIcon sx={{ color: "#DB4437" }} />}
            sx={{ color: "black", border: "1px solid #DB4437" }}
            onClick={handleGoogleSignUp}
          >
            Sign up with Google
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
        <LoginSignupForm buttonText="sign up" onButton={handleSignup} />
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

  function handleSignup(email: string, password: string) {
    signup(email, password)
      .then(() => {
        alert("Sigup successful!");
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleGoogleSignUp() {
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

export default SignupModal;
