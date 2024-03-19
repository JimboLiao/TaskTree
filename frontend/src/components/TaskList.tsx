import { Box, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TaskCard from "./TaskCard";

//@todo add tasks type
const TaskList = ({ tasks }) => {
  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <TaskCard
            key={index}
            title={task.title}
            start={task.start}
            end={task.end}
            description={task.description}
            statusColor={task.statusColor}
            importanceColor={task.importanceColor}
            categoryColor={task.categoryColor}
          />
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "50px",
          }}
        >
          <TaskAltIcon fontSize="large" />
          <Typography>No Tasks here.</Typography>
        </Box>
      )}
    </>
  );
};

export default TaskList;
