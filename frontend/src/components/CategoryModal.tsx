import { Button, TextField, styled } from "@mui/material";
import { useState } from "react";
import { Category, createCategoryApi } from "../api/categoryAPI";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "50px",
});

interface CategoryModalProps {
  onAfterAddCategory: (newCategory: Category) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  onAfterAddCategory,
}) => {
  const [name, setName] = useState<string>("");
  return (
    <>
      <StyledContainer>
        <TextField
          id="name"
          label="Category name"
          value={name}
          onChange={handleNameChange}
          helperText="Please enter a category name"
          sx={{ paddingBottom: "20px" }}
        />
        <Button variant="contained" onClick={handleAddCategory}>
          Add
        </Button>
      </StyledContainer>
    </>
  );

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleAddCategory() {
    console.log("add category");
    createCategoryApi(name).then((category) => {
      if (!category) {
        throw new Error("fail to create category");
      }
      onAfterAddCategory(category);
    });
  }
};

export default CategoryModal;
