import { Box, styled } from "@mui/material";
import { useState } from "react";
import DataEntry from "./DataEntry";
import { createTaskApi } from "../api/taskAPI";

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "10px",
});

const TaskToolbar: React.FC = () => {
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
          onAddNewData={handleAddTask}
          disabledCondition={newTask === ""}
        />
      </Box>
    </StyledContainer>
  );

  function handleChangeNewTask(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleAddTask() {
    const d = new Date();
    const task = { title: newTask, start: d, end: d, isAllDay: true };
    createTaskApi(task)
      .then(() => setNewTask("")) //@todo update task info
      .catch((err) => console.error(err));
  }
};

export default TaskToolbar;
