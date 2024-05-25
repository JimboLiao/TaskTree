import { Outlet } from "react-router-dom";
import WorkspaceSideBar from "./WorkspaceSideBar";
import AppHeader from "./AppHeader";
import { styled } from "@mui/material";
import { TaskInfoProvider } from "../contexts/TaskInfoContext";

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
  return (
    <>
      <TaskInfoProvider>
        <AppHeader />
        <StyledContainer>
          <StyledWorkspaceContainer>
            <WorkspaceSideBar />
            <Outlet />
          </StyledWorkspaceContainer>
        </StyledContainer>
      </TaskInfoProvider>
    </>
  );
};

export default WorkspaceRoot;
