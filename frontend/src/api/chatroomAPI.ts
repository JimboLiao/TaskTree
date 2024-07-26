import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
const chatroomApiUrl = `${apiUrl}/chatrooms`;
import { User, Message } from "../../../config/type";
import { Dayjs } from "dayjs";
import { wrapRoomMessage } from "../utils/wrapperFunctions";

export type ChatHistory = Message & {
  chatroomToUser: {
    chatroomId: number;
    user: User;
  };
};

export type RoomMessage = {
  id: number;
  chatroomId: number;
  userId: number;
  username: string;
  content: string;
  createTime: Dayjs;
};

async function getChatroomsApi() {
  const response = await axios.get(`${chatroomApiUrl}/`, {
    withCredentials: true,
  });
  return response.data.data;
}

async function createChatroomApi(name: string) {
  const response = await axios.post(
    `${chatroomApiUrl}/`,
    {
      name: name,
    },
    { withCredentials: true }
  );
  return response.data.data;
}

async function getChatroomApi(id: number) {
  const response = await axios.get(`${chatroomApiUrl}/${id}`, {
    withCredentials: true,
  });

  return response.data.data;
}

async function getChatroomHistoryApi(id: number) {
  const response = await axios.get(`${chatroomApiUrl}/${id}/messages`, {
    withCredentials: true,
  });

  const data: ChatHistory[] = response.data.data;
  const wrappedData = data.map((d) => wrapRoomMessage(d));
  return wrappedData;
}

async function addChatroomMemberApi(chatroomId: number, emails: string[]) {
  const response = await axios.post(
    `${chatroomApiUrl}/${chatroomId}/users`,
    {
      emails: emails,
    },
    { withCredentials: true }
  );

  return response.data.data;
}

export {
  getChatroomsApi,
  createChatroomApi,
  getChatroomApi,
  getChatroomHistoryApi,
  addChatroomMemberApi,
};
