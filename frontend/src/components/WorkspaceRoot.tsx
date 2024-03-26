import { Outlet } from "react-router-dom";
import WorkspaceSideBar from "./WorkspaceSideBar";
import AppHeader from "./AppHeader";
import { styled } from "@mui/material";

const StyledContainer = styled("div")({
  width: "100%",
  height: "100vh",
  paddingTop: "69px", // padding for app header
});

const StyledWorkspaceContainer = styled("div")({
  display: "flex",
  height: "100%",
  width: "100%",
});

const WorkspaceRoot = () => {
  function handleLogin() {
    //@todo login function
    console.log("login");
  }
  return (
    <>
      <AppHeader onLogin={handleLogin} isLoggedIn={true} />
      <StyledContainer>
        <StyledWorkspaceContainer>
          <WorkspaceSideBar />
          <Outlet />
        </StyledWorkspaceContainer>
      </StyledContainer>
    </>
  );
};

export default WorkspaceRoot;
