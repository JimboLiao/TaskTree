import { Button, TextField, styled } from "@mui/material";
import { useState } from "react";
import Modal from "./Modal";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "50px",
});

interface SubtaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSubtask: (title: string) => void;
}

const SubtaskModal: React.FC<SubtaskModalProps> = ({
  isOpen,
  onClose,
  onAddSubtask,
}) => {
  const [title, setTitle] = useState<string>("");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <StyledContainer>
          <TextField
            id="title"
            label="subtask title"
            value={title}
            onChange={handleTitleChange}
            helperText={`Add new subtask`}
            sx={{ paddingBottom: "20px" }}
          />
          <Button variant="contained" onClick={handleAddSubtask}>
            Add
          </Button>
        </StyledContainer>
      </Modal>
    </>
  );

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }
  function handleAddSubtask() {
    onAddSubtask(title);
    setTitle("");
  }
};

export default SubtaskModal;
