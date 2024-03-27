import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { TaskImportance, TaskStatus } from "../data/data";

interface TaskSelectsProps {
  category: string;
  status: TaskStatus;
  importance: TaskImportance;
  onCategory: (event: SelectChangeEvent) => void;
  onStatus: (event: SelectChangeEvent<TaskStatus>) => void;
  onImportance: (event: SelectChangeEvent<TaskImportance>) => void;
}
const TaskSelector: React.FC<TaskSelectsProps> = ({
  category,
  status,
  importance,
  onCategory,
  onStatus,
  onImportance,
}) => {
  return (
    <>
      <Box>
        <FormControl
          variant="standard"
          sx={{ minWidth: 120, paddingRight: "8px" }}
        >
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            onChange={onCategory}
            label="Category"
          >
            {/* @todo category options */}
            <MenuItem value={10}>Category1</MenuItem>
          </Select>
        </FormControl>
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
