import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { TaskImportance, TaskStatus } from "../api/taskAPI";
import CategorySelector from "./CategorySelector";
import { Category } from "../api/categoryAPI";

interface TaskSelectsProps {
  categoryId?: string;
  status?: TaskStatus;
  importance?: TaskImportance;
  onCategory: (newCategory: Category) => void;
  onStatus: (event: SelectChangeEvent<TaskStatus>) => void;
  onImportance: (event: SelectChangeEvent<TaskImportance>) => void;
}
const TaskSelector: React.FC<TaskSelectsProps> = ({
  categoryId = "",
  status = TaskStatus.TODO,
  importance = TaskImportance.NORMAL,
  onCategory,
  onStatus,
  onImportance,
}) => {
  return (
    <>
      <Box>
        <CategorySelector categoryId={categoryId} onCategory={onCategory} />
        <FormControl
          variant="standard"
          sx={{ minWidth: 120, paddingRight: "8px" }}
        >
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            onChange={onStatus}
            label="Status"
          >
            <MenuItem value={TaskStatus.TODO}>Todo</MenuItem>
            <MenuItem value={TaskStatus.DOING}>Doing</MenuItem>
            <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          variant="standard"
          sx={{ minWidth: 120, paddingRight: "8px" }}
        >
          <InputLabel id="importance-label">Importance</InputLabel>
          <Select
            labelId="importance-label"
            id="importance"
            value={importance}
            onChange={onImportance}
            label="Importance"
          >
            <MenuItem value={TaskImportance.LOW}>Low</MenuItem>
            <MenuItem value={TaskImportance.NORMAL}>Normal</MenuItem>
            <MenuItem value={TaskImportance.HIGH}>High</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default TaskSelector;
