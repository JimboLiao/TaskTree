import { Box, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TaskCard from "./TaskCard";
import { useState } from "react";
import TaskTableModal from "./TaskTableModal";
import { TaskInfo } from "../api/taskAPI";
import { useTaskInfo } from "../contexts/TaskInfoContext";
const TaskList = ({ tasks }: { tasks: TaskInfo[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const { fetchTaskInfos } = useTaskInfo();

  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            start={task.start}
            end={task.end}
            description={task.description}
            statusColor={task.statusColor}
            importanceColor={task.importanceColor}
            categoryColor={task.categoryColor}
            isAllDay={task.isAllDay}
            onTaskCard={() => handleClickTaskCard(task.id)}
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
      <TaskTableModal
        isModalOpen={isModalOpen}
        onModalClose={handleClose}
        taskId={selectedTaskId}
      />
    </>
  );

  function handleClickTaskCard(taskId: number) {
    setIsModalOpen(true);
    setSelectedTaskId(taskId);
  }
  function handleClose() {
    fetchTaskInfos();
    setSelectedTaskId(null);
    setIsModalOpen(false);
  }
};

export default TaskList;
