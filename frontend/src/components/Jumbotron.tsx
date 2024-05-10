import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import logoImg from "../assets/logo-1.png";
import LoginSignupModalToggle from "./LoginSignupModalToggle";

const StyledJumbotron = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
});

const BackgroundImage = styled("div")({
  backgroundImage: `url(${logoImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  opacity: 0.5,
  height: "100%",
  width: "100%",
});

const Jumbotron: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <StyledJumbotron>
      <Box
        display="flex"
        flexDirection="column"
        minWidth="310px"
        marginRight="50px"
      >
        <Typography variant="h2" component="div" gutterBottom>
          TaskTree
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          Manage your tasks elegantly.
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            sx={{ bgcolor: "#56DA02", color: "#fff" }}
            onClick={handleClick}
          >
            Get Started
          </Button>
          <LoginSignupModalToggle
            isOpen={isOpen}
            onClose={handleClose}
            initModal="signup"
          />
        </Box>
      </Box>
      <Box height="500px" width="500px" minWidth="500px">
        <BackgroundImage />
      </Box>
    </StyledJumbotron>
  );

  function handleClick() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }
};

export default Jumbotron;
