import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const MemberBtn: React.FC = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const { logout } = useUserContext();
  const navigate = useNavigate();
  const open = Boolean(anchor);
  return (
    <>
      <Button
        color="inherit"
        id="member-button"
        aria-controls={open ? "member-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Member
      </Button>
      <Menu
        id="member-menu"
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleWorkspace}>Workspace</MenuItem>
        <MenuItem onClick={handleSync}>Sync to Google Calendar</MenuItem>
        <MenuItem onClick={handleImport}>Import from Google Calendar</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchor(event.currentTarget);
  }
  function handleClose() {
    setAnchor(null);
  }
  function handleLogout() {
    logout();
    navigate("/");
  }
  function handleProfile() {
    navigate("/profile");
  }
  function handleWorkspace() {
    navigate("/workspace/dayview");
  }
  function handleSync() {
    // @todo sync data to google calendar
  }
  function handleImport() {
    // @todo import data from google calendar
  }
};

export default MemberBtn;
