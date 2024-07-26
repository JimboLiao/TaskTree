import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import ChatHistory from "./ChatHistory";
import { RoomMessage, addChatroomMemberApi } from "../api/chatroomAPI";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  OutlinedInput,
  TextField,
  styled,
} from "@mui/material";
import WorkspaceTitle from "./WorkspaceTitle";
import { Send } from "@mui/icons-material";
import { getChatroomApi, getChatroomHistoryApi } from "../api/chatroomAPI";
import { useUserContext } from "../contexts/UserContext";
import dayjs from "dayjs";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  paddingTop: "20px",
  paddingBottom: "20px",
  paddingLeft: "50px",
  paddingRight: "50px",
});

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const socket = io(backendUrl, { path: "/socket" });

const ChatRoom: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [room, setRoom] = useState<string>("test room");
  const [newMember, setNewMember] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { roomId } = useParams();
  const { user } = useUserContext();
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleAddMember = () => {
    if (!newMember || !roomId) return;
    addChatroomMemberApi(parseInt(roomId, 10), [newMember]).then((data) => {
      setNewMember("");
      handleDialogClose();
    });
  };

  useEffect(() => {
    console.log("useEffect");
    if (!roomId) return;
    if (!user) return;
    getChatroomHistoryApi(parseInt(roomId, 10)).then((data) => {
      setMessages(data);
    });

    getChatroomApi(parseInt(roomId, 10)).then((data) => {
      setRoom(data.name);
      socket.emit("join room", roomId);
      socket.emit("register", user);
      socket.on(
        "chat message",
        (msg: {
          id: number;
          chatroomId: number;
          userId: number;
          username: string;
          content: string;
          createTime: string;
        }) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { ...msg, createTime: dayjs(msg.createTime) },
          ]);
        }
      );

      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    });

    return () => {
      socket.emit("leave room", roomId);
      socket.off("chat message");
    };
  }, [roomId]);

  function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    socket.emit("chat message", { roomId, message: newMessage });
    setNewMessage("");
  }

  function handleChangeNewMessages(event: React.ChangeEvent<HTMLInputElement>) {
    setNewMessage(event.target.value);
  }

  return (
    <StyledContainer>
      <WorkspaceTitle title={room}>
        <Button
          variant="outlined"
          sx={{ color: "#004038", border: "1px solid" }}
          onClick={handleDialogOpen}
        >
          Add Member
        </Button>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Add New member</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="New member email"
              type="text"
              fullWidth
              value={newMember}
              onChange={(e) => {
                setNewMember(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddMember} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </WorkspaceTitle>
      <Box
        display="flex"
        flexDirection={"column"}
        height="100%"
        width="100%"
        justifyContent={"space-between"}
      >
        <ChatHistory messages={messages.map((msg) => ({ ...msg }))} />
        <Box display="flex" alignItems="center">
          <OutlinedInput
            fullWidth
            multiline
            placeholder="message..."
            value={newMessage}
            onChange={handleChangeNewMessages}
          />
          <IconButton
            sx={{ padding: "10px" }}
            onClick={sendMessage}
            disabled={newMessage === ""}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default ChatRoom;
