import { Button } from "@mui/material";
import { useState } from "react";
import LoginSignupModalToggle from "./LoginSignupModalToggle";

const LoginButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Login
      </Button>
      <LoginSignupModalToggle
        isOpen={isOpen}
        onClose={handleClose}
        initModal="login"
      />
    </>
  );

  function handleClick() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }
};

export default LoginButton;
