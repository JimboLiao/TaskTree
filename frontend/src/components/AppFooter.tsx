import { Box, Typography, styled } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  minHeight: "200px",
  padding: "20px 0",
  backgroundColor: "#DFDFDF",
});

const StyledLinksContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  height: "200px",
});

const AppFooter: React.FC = () => {
  return (
    <>
      <StyledContainer>
        <StyledLinksContainer>
          <Box sx={{ paddingRight: "10px" }}>
            <FacebookIcon />
          </Box>
          <Box sx={{ paddingRight: "10px" }}>
            <InstagramIcon />
          </Box>
          <Typography sx={{ paddingRight: "20px" }}>CONTACT US</Typography>
          <Typography>POLICY</Typography>
        </StyledLinksContainer>
        <Typography>copyright 2024</Typography>
      </StyledContainer>
    </>
  );
};

export default AppFooter;
