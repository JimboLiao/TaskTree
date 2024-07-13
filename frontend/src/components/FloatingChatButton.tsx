import React, { useState } from "react";
import {
  Fab,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { useNavigate } from "react-router-dom";
import { ChatRoom } from "../../../config/type";

interface FloatingChatButtonProps {
  rooms: ChatRoom[];
  onCreateRoom: (newRoom: string) => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  rooms,
  onCreateRoom,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newRoom, setNewRoom] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCreateRoom = () => {
    onCreateRoom(newRoom);
    setNewRoom("");
    handleDialogClose();
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="chatroom"
        onClick={handleClick}
        style={{ position: "fixed", bottom: 20, left: 20 }}
      >
        <ChatOutlinedIcon />
      </Fab>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {rooms.map((room) => (
          <MenuItem
            key={room.id}
            onClick={() => {
              navigate(`/workspace/chatroom/${room.id}`);
              handleClose();
            }}
          >
            {room.name}
          </MenuItem>
        ))}
        <MenuItem onClick={handleDialogOpen}>
          <AddIcon />
          Create New Room
        </MenuItem>
      </Menu>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Create New Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Room Name"
            type="text"
            fullWidth
            value={newRoom}
            onChange={(e) => {
              setNewRoom(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateRoom} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FloatingChatButton;
