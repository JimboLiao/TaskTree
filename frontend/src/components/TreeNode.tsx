import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import Tree from "./Tree";
import React, { useEffect, useState } from "react";
import { TaskInfo, getSubTasksApi } from "../api/taskAPI";

interface TreeNodeProps {
  node: TaskInfo;
  onEdit: (taskId: number) => void;
  onAdd: (taskId: number, cb: () => void) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onEdit, onAdd }) => {
  const {
    id,
    title,
    start,
    end,
    statusColor,
    importanceColor,
    categoryColor,
    categoryId,
  } = node;

  const [showSubtasks, setShowSubtasks] = useState(false);
  const [subtasks, setSubtasks] = useState<TaskInfo[]>([]);
  const [update, setUpdate] = useState<number>(0);

  const fetchSubtasks = async () => {
    try {
      const data = await getSubTasksApi(id, categoryId);
      setSubtasks(data);
    } catch (error) {
      console.error("Error fetching subtasks:", error);
    }
  };

  useEffect(() => {
    fetchSubtasks();
  }, [showSubtasks, id, categoryId, update]);

  function handleShowsubtasks() {
    setShowSubtasks(!showSubtasks);
  }
  function incrementUpdate() {
    setUpdate(update + 1);
  }

  const handleAdd = () => {
    onAdd(id, incrementUpdate);
  };

  const handleEdit = () => {
    onEdit(id);
  };

  const showsubtasksBtn =
    subtasks.length === 0 ? null : showSubtasks ? (
      <Tooltip arrow placement="top" title="Hide subtasks">
        <IconButton onClick={handleShowsubtasks}>
          <ArrowDropUpIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip arrow placement="top" title="Show subtasks">
        <IconButton onClick={handleShowsubtasks}>
          <ArrowDropDownIcon />
        </IconButton>
      </Tooltip>
    );

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        sx={{ paddingTop: "8px", paddingBottom: "8px", minHeight: "30px" }}
      >
        <Box sx={{ minWidth: "28px", paddingRight: "8px" }}>
          <Box
            component="span"
            sx={{
              width: 15,
              height: 15,
              display: "inline-block",
              borderRadius: "50%",
              backgroundColor: statusColor,
              marginRight: 1,
            }}
          />
          <Box
            component="span"
            sx={{
              width: 15,
              height: 15,
              display: "inline-block",
              borderRadius: "50%",
              backgroundColor: importanceColor,
            }}
          />
        </Box>
        <Box sx={{ paddingRight: "8px" }}>
          <Typography fontSize="20px">{title}</Typography>
        </Box>
        <Box sx={{ paddingRight: "8px", color: "#A5A5A5" }}>
          {start.format("MMM D").toString()} - {end.format("MMM D").toString()}
        </Box>
        <Tooltip arrow placement="top" title="Edit task">
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title="Add subtask">
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
        {showsubtasksBtn}
      </Box>
      {showSubtasks && (
        <Box
          sx={{
            paddingLeft: "10px",
            borderLeft: "2px solid",
            borderColor: categoryColor,
          }}
        >
          <Tree treeData={subtasks} onEdit={onEdit} onAdd={onAdd} />
        </Box>
      )}
    </>
  );
};

export default React.memo(TreeNode);
