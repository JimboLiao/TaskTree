import { Box, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import EditIcon from "@mui/icons-material/Edit";
import Tree from "./Tree";
import { useState } from "react";

//@todo interface
const TreeNode = ({ node }) => {
  const {
    title,
    start,
    end,
    statusColor,
    importanceColor,
    categoryColor,
    children,
  } = node;

  const [showChildren, setShowChildren] = useState(false);

  function handleShowChildren() {
    setShowChildren(!showChildren);
  }

  const showChildrenBtn = !children ? null : showChildren ? (
    <IconButton onClick={handleShowChildren}>
      <ArrowDropUpIcon />
    </IconButton>
  ) : (
    <IconButton onClick={handleShowChildren}>
      <ArrowDropDownIcon />
    </IconButton>
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
          {start} - {end}
        </Box>
        <IconButton>
          <EditIcon />
        </IconButton>
        {showChildrenBtn}
      </Box>
      {children && showChildren && (
        <Box
          sx={{
            paddingLeft: "10px",
            borderLeft: "2px solid",
            borderColor: categoryColor,
          }}
        >
          <Tree treeData={children} />
        </Box>
      )}
    </>
  );
};

export default TreeNode;
