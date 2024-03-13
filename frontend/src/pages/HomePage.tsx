import { styled } from "@mui/material";
import AppHeader from "../components/AppHeader";
import Jumbotron from "../components/Jumbotron";
import AppFooter from "../components/AppFooter";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { useState } from "react";

const StyledContainer = styled("div")({
  width: "80%",
  margin: "0 auto",
});

const HomePage = () => {
  const [showModal, setShowModal] = useState(0);

  function handleModalClose() {
    setShowModal(0);
  }

  function handleLogin() {
    setShowModal(1);
  }

  function handleSignup() {
    setShowModal(2);
  }

  let modalContent = null;
  if (showModal === 1) {
    modalContent = (
      <LoginModal onClose={handleModalClose} onCreateAccount={handleSignup} />
    );
  } else if (showModal === 2) {
    modalContent = (
      <SignupModal onClose={handleModalClose} onLogin={handleLogin} />
    );
  }

  return (
    <>
      <AppHeader onLogin={handleLogin} />
      <StyledContainer>
        <Jumbotron onSignup={handleSignup} />
      </StyledContainer>
      {modalContent}
      <AppFooter />
    </>
  );
};

export default HomePage;
