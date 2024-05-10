import { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const LoginSignupModalToggle: React.FC<{
  isOpen: boolean;
  initModal: "login" | "signup";
  onClose: () => void;
}> = ({ isOpen = true, initModal = 1, onClose }) => {
  // 0 for no modal, 1 for login modal, 2 for signup modal
  const [showModal, setShowModal] = useState(initModal);

  let modalContent = null;
  if (showModal === "login") {
    modalContent = (
      <LoginModal onClose={handleModalClose} onCreateAccount={handleSignup} />
    );
  } else if (showModal === "signup") {
    modalContent = (
      <SignupModal onClose={handleModalClose} onLogin={handleLogin} />
    );
  }

  return <>{isOpen ? modalContent : null}</>;

  function handleModalClose() {
    setShowModal(initModal);
    onClose();
  }
  function handleSignup() {
    setShowModal("signup");
  }
  function handleLogin() {
    setShowModal("login");
  }
};

export default LoginSignupModalToggle;
