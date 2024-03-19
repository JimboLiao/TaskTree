import { Box, Button, Input, styled } from "@mui/material";
import { useState } from "react";

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
        <Input
          placeholder="New Task..."
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
        />
        <Box paddingLeft="4px" display="inline-block">
          <Button
            variant="outlined"
            sx={{
              padding: 0,
              border: "1px solid #A5A5A5",
              color: "#004038",
              height: "24px",
            }}
            onClick={onAddTask}
          >
            Add
          </Button>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default TaskToolbar;
