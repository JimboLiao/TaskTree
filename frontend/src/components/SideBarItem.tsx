import { ListItem, ListItemButton, ListItemText, styled } from "@mui/material";

const StyledListItem = styled(ListItem)(({ color }) => ({
  borderLeft: `5px solid ${color}`,
  marginBottom: "8px",
  padding: "0",
}));

interface SideBarItemProps {
  color?: string;
  text: string;
  onClick?: () => void;
}
const SideBarItem: React.FC<SideBarItemProps> = ({
  color = "#FFF",
  text,
  onClick,
}) => {
  return (
    <StyledListItem color={color}>
      <ListItemButton onClick={onClick || handleClick}>
        <ListItemText>{text}</ListItemText>
      </ListItemButton>
    </StyledListItem>
  );

  function handleClick() {
    // default behavior
    console.log(`You clicked the ${text} button.`);
  }
};

export default SideBarItem;
