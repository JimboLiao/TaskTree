import { Clear } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface ItemListProps {
  items: Array<any>;
  onDelete: (index: number) => void;
}
const ItemList: React.FC<ItemListProps> = ({ items, onDelete }) => {
  return (
    <>
      {items.map((item, index) => (
        <Box key={index} display="flex" alignItems="center">
          <Typography paddingRight="4px" sx={{ wordBreak: "break-all" }}>
            {item}
          </Typography>
          <IconButton
            aria-label="remove"
            onClick={() => onDelete(index)}
            sx={{ padding: "0px" }}
          >
            <Clear />
          </IconButton>
          <Box paddingRight="8px" />
        </Box>
      ))}
    </>
  );
};

export default ItemList;
