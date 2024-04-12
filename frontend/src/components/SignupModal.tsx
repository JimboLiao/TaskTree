import { Box, Typography, styled } from "@mui/material";
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
  const { signup } = useUserContext();

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
};

export default SignupModal;
