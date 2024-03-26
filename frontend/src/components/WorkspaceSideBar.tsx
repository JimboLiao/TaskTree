import { Divider, List, styled } from "@mui/material";
import SideBarItem from "./SideBarItem";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "20%",
  height: "100%",
  minWidth: "240px",
  borderRight: "1px solid #A5A5A5",
  overflow: "auto",
});

//@todo categories are temporary data, should be removed
const categories = [
  {
    name: "Work",
    color: "#1983FF",
  },
  {
    name: "Travel",
    color: "#207C00",
  },
];

const WorkspaceSideBar: React.FC = () => {
  return (
    <>
      <StyledContainer>
        <List>
          {["Day view", "Calendar"].map((item) => {
            return <SideBarItem key={item} text={item} />;
          })}
        </List>
        <Divider />
        <List>
          {categories?.map((item) => {
            return (
              <SideBarItem
                key={item.name}
                text={item.name}
                color={item.color}
              />
            );
          })}
        </List>
      </StyledContainer>
    </>
  );
};

export default WorkspaceSideBar;
