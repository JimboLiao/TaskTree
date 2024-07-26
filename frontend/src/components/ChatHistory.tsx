import { Box, Typography } from "@mui/material";

interface Message {
  username: string;
  content: string;
}

interface ChatHistoryProps {
  messages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <Box
      height="100%"
      sx={{
        borderRadius: "4px",
        border: "1px solid",
        overflow: "auto",
        padding: "8px",
        marginBottom: "8px",
        maxHeight: "580px",
      }}
    >
      {messages.length === 0 ? (
        <Typography>No messages yet...</Typography>
      ) : (
        messages.map((message, index) => (
          <Box display="flex" paddingBottom="4px" key={index}>
            <Typography paddingRight="4px">{message.username}:</Typography>
            <Typography>{message.content}</Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default ChatHistory;
