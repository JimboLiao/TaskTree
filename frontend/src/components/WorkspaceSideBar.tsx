import { Divider, List, styled } from "@mui/material";
import SideBarItem from "./SideBarItem";
import { useState } from "react";
import { Category } from "../api/categoryAPI";
import CategoryModal from "./CategoryModal";
import { useNavigate } from "react-router-dom";
import useCategories from "../hooks/useCategories";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "20%",
  height: "100%",
  minWidth: "240px",
  borderRight: "1px solid #A5A5A5",
  overflow: "auto",
});

const WorkspaceSideBar: React.FC = () => {
  const { categories, updateCategories } = useCategories();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <StyledContainer>
        <List>
          <SideBarItem
            key={"Day view"}
            text={"Day view"}
            onClick={() => navigate("/workspace/dayview")}
          />
          <SideBarItem
            key={"Calendar"}
            text={"Calendar"}
            onClick={() => navigate("/workspace/calendarview")}
          />
        </List>
        <Divider />
        <List>
          {categories?.map((item) => {
            return (
              <SideBarItem
                key={item.id}
                text={item.name}
                color={item.color}
                onClick={handleNavigateToTreeView(item.id.toString())}
              />
            );
          })}
          <SideBarItem text="Add Category" onClick={handleOpenModal} />
        </List>
      </StyledContainer>

      <CategoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAfterAddCategory={handleAddCategories}
      />
    </>
  );

  function handleOpenModal() {
    setIsOpen(true);
  }
  function handleAddCategories(newCategory: Category) {
    updateCategories([...categories, newCategory]);
    setIsOpen(false);
  }
  function handleNavigateToTreeView(id: string) {
    const nav = () => {
      navigate(`/workspace/treeview/${id}`);
    };
    return nav;
  }
};

export default WorkspaceSideBar;
