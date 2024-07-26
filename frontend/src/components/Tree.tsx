import React from "react";
import { Box } from "@mui/material";
import TreeNode from "./TreeNode";
import { TaskInfo } from "../api/taskAPI";

interface TreeProps {
  treeData: TaskInfo[];
  onEdit: (taskId: number) => void;
  onAdd: (taskId: number, cb: () => void) => void;
}

const Tree: React.FC<TreeProps> = ({ treeData, onEdit, onAdd }) => {
  return (
    <>
      <Box>
        {treeData?.map((node) => (
          <TreeNode key={node.id} node={node} onEdit={onEdit} onAdd={onAdd} />
        ))}
      </Box>
    </>
  );
};

export default Tree;
