import { Box, styled } from "@mui/material";
import { useState } from "react";
import DataEntry from "./DataEntry";

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "10px",
});

interface TaskToolbarProps {
  onAddTask: () => void;
}
const TaskToolbar: React.FC<TaskToolbarProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");

  return (
    <StyledContainer>
      <label>
        Sort by:
        <Box paddingLeft="4px" display="inline-block">
          <select>
            <option value="importance">importance</option>
            <option value="category">category</option>
            <option value="status">status</option>
          </select>
        </Box>
      </label>
      <Box>
        <DataEntry
          newData={newTask}
          placeholder="New Task..."
          onChangeNewData={handleChangeNewTask}
          onAddNewData={onAddTask}
          disabledCondition={newTask === ""}
        />
      </Box>
    </StyledContainer>
  );

  function handleChangeNewTask(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }
};

export default TaskToolbar;
