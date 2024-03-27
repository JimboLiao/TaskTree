import { Box, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TaskCard from "./TaskCard";
import { useState } from "react";
import TaskTableModal from "./TaskTableModal";

//@todo add tasks type
const TaskList = ({ tasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            onTaskCard={handleClickTaskCard}
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
      <TaskTableModal isModalOpen={isModalOpen} onModalClose={handleClose} />
    </>
  );

  function handleClickTaskCard() {
    setIsModalOpen(true);
  }
  function handleClose() {
    setIsModalOpen(false);
    // @todo close modal
    // send request to api to change update task data
  }
};

export default TaskList;
