import { Box } from "@mui/material";
import TreeNode from "./TreeNode";

//@todo interface
const Tree = ({ treeData }) => {
  return (
    <>
      <Box>
        {treeData.map((node) => (
          <TreeNode node={node} />
        ))}
      </Box>
    </>
  );
};

export default Tree;
