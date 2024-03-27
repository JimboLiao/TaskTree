import { styled } from "@mui/material";
import WorkspaceTitle from "../components/WorkspaceTitle";
import Tree from "../components/Tree";
import { treeData } from "../data/data";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  paddingTop: "20px",
  paddingBottom: "20px",
  paddingLeft: "50px",
  paddingRight: "50px",
});

const TreeViewPage = () => {
  return (
    <StyledContainer>
      <WorkspaceTitle title="Treeview" />
      <Tree treeData={treeData} />
    </StyledContainer>
  );
};

export default TreeViewPage;
