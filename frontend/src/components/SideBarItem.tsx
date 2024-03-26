import { ListItem, ListItemButton, ListItemText, styled } from "@mui/material";

const StyledListItem = styled(ListItem)(({ color }) => ({
  borderLeft: `5px solid ${color}`,
  marginBottom: "8px",
  padding: "0",
}));

interface SideBarItemProps {
  color?: string;
  text: string;
}
const SideBarItem: React.FC<SideBarItemProps> = ({ color = "#FFF", text }) => {
  return (
    <StyledListItem color={color}>
      <ListItemButton>
        <ListItemText>{text}</ListItemText>
      </ListItemButton>
    </StyledListItem>
  );
};

export default SideBarItem;
