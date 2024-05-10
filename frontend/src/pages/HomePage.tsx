import { styled } from "@mui/material";
import AppHeader from "../components/AppHeader";
import Jumbotron from "../components/Jumbotron";
import AppFooter from "../components/AppFooter";

const StyledContainer = styled("div")({
  width: "80%",
  margin: "0 auto",
});

const HomePage = () => {
  return (
    <>
      <AppHeader />
      <StyledContainer>
        <Jumbotron />
      </StyledContainer>
      <AppFooter />
    </>
  );
};

export default HomePage;
