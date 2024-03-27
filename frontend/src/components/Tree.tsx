import { Box } from "@mui/material";
import TreeNode from "./TreeNode";
import TaskTableModal from "./TaskTableModal";
import { useState } from "react";

//@todo interface
const Tree = ({ treeData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Box>
        {treeData.map((node, index) => (
          <TreeNode key={index} node={node} onEdit={handleEditTreeNode} />
        ))}
      </Box>
      <TaskTableModal isModalOpen={isModalOpen} onModalClose={handleClose} />
    </>
  );

  function handleEditTreeNode() {
    setIsModalOpen(true);
  }
  function handleClose() {
    setIsModalOpen(false);
    // @todo close modal
    // send request to api to change update task data
  }
};

export default Tree;
