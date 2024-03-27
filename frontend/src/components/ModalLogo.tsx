import { Typography, styled } from "@mui/material";
import logo from "../assets/logo-1.png";

const StyledLogoContainer = styled("div")({
  display: "flex",
  paddingBottom: "20px",
  justifyItems: "flex-start",
  alignItems: "baseline",
  width: "100%",
});

const ModalLogo: React.FC = () => {
  return (
    <StyledLogoContainer>
      <img src={logo} alt="Logo" height="40" />
      <Typography variant="h4" sx={{ color: "#004038", paddingLeft: "5px" }}>
        TaskTree
      </Typography>
    </StyledLogoContainer>
  );
};

export default ModalLogo;
