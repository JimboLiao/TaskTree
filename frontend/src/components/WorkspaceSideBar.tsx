import { Divider, List, styled } from "@mui/material";
import SideBarItem from "./SideBarItem";
import { useEffect, useState } from "react";
import { Category, getCategoriesApi } from "../api/categoryAPI";
import Modal from "./Modal";
import CategoryModal from "./CategoryModal";
import { useNavigate } from "react-router-dom";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesApi();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
                onClick={handleNavigateToTreeView(item.id)}
              />
            );
          })}
          <SideBarItem text="Add Category" onClick={handleOpenModal} />
        </List>
      </StyledContainer>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CategoryModal onAfterAddCategory={handleAddCategories} />
      </Modal>
    </>
  );

  function handleOpenModal() {
    setIsOpen(true);
  }
  function handleAddCategories(newCategory: Category) {
    setCategories([...categories, newCategory]);
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
