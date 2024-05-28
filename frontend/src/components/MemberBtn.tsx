import { Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { syncTasksToGoogleCalendarApi } from "../api/taskAPI";
import ImportEventsModal from "./ImportEventsModal";

const MemberBtn: React.FC = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const { logout } = useUserContext();
  const navigate = useNavigate();
  const open = Boolean(anchor);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

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
        <MenuItem onClick={handleSync}>
          Sync to Google Calendar
          {isSyncing && (
            <CircularProgress size={16} sx={{ marginLeft: "8px" }} />
          )}
        </MenuItem>
        <MenuItem onClick={handleImport}>Import from Google Calendar</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <ImportEventsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
    setIsSyncing(true);
    syncTasksToGoogleCalendarApi()
      .then((data) => {
        setIsSyncing(false);
        alert("Sync successful!");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleImport() {
    setIsOpen(true);
  }
};

export default MemberBtn;
