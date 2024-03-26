import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import logoImg from "../assets/logo-1.png";

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

interface JumbotronProps {
  onSignup: () => void;
}
const Jumbotron: React.FC<JumbotronProps> = ({ onSignup }) => {
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
            onClick={onSignup}
          >
            Get Started
          </Button>
        </Box>
      </Box>
      <Box height="500px" width="500px" minWidth="500px">
        <BackgroundImage />
      </Box>
    </StyledJumbotron>
  );
};

export default Jumbotron;
