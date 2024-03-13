import { IconButton, Typography, styled } from "@mui/material";
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
          <IconButton>
            <FacebookIcon />
          </IconButton>

          <IconButton>
            <InstagramIcon />
          </IconButton>

          <Typography
            style={{ cursor: "pointer" }}
            sx={{ paddingRight: "20px" }}
          >
            CONTACT US
          </Typography>
          <Typography style={{ cursor: "pointer" }}>POLICY</Typography>
        </StyledLinksContainer>
        <Typography>copyright 2024</Typography>
      </StyledContainer>
    </>
  );
};

export default AppFooter;
