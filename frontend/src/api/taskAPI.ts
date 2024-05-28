import axios from "axios";
import {
  unwrapTaskDetail,
  wrapTaskDetail,
  wrapTaskInfo,
} from "../utils/wrapperFunctions";
import {
  User,
  Category,
  Task,
  Resource,
  TaskImportance,
  TaskStatus,
} from "../../../config/type";
import { Dayjs } from "dayjs";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
const taskApiUrl = `${apiUrl}/tasks`;

export type TaskInfoResponse = Task & { category: Category[] };

export enum StatusColor {
  TODO = "#131313",
  DOING = "#969696",
  DONE = "#DDDDDD",
}

export enum ImportanceColor {
  LOW = "#56DA02",
  NORMAL = "#FF9900",
  HIGH = "#FF0000",
}

export type TaskInfo = {
  id: number;
  title: string;
  start: Dayjs;
  end: Dayjs;
  description: string;
  isAllDay: boolean;
  status: TaskStatus;
  importance: TaskImportance;
  reminder: number;
  parentTaskId: number | null;
  location: string;
  createTime: Dayjs;
  updateTime: Dayjs;
  categoryId: number;
  categoryColor: string;
  categoryName: string;
  statusColor: string;
  importanceColor: string;
};

export type TaskDetailResponse = TaskInfoResponse & {
  resources: Resource[];
} & {
  attendee: { id: number; user: User }[];
};

export type Attendee = { attendeeId: number } & User;

export type TaskDetail = TaskInfo & { resources: Resource[] } & {
  attendees: Attendee[];
};

async function getTasksInRangeApi(start: Date, end: Date): Promise<TaskInfo[]> {
  const response = await axios.get(
    `${taskApiUrl}/get?start=${start.toISOString()}&end=${end.toISOString()}`,
    {
      withCredentials: true,
    }
  );
  const data = response.data.data;
  const wrappedData = data.map((d: TaskInfoResponse) => wrapTaskInfo(d));

  return wrappedData;
}

async function getTaskDetailApi(id: number) {
  const response = await axios.get(`${taskApiUrl}/get/${id}`, {
    withCredentials: true,
  });
  const data = response.data.data;
  const wrappedData = wrapTaskDetail(data);

  return wrappedData;
}

async function createTaskApi(
  newTask: {
    title?: string | null;
    start: Date;
    end: Date;
    isAllDay?: boolean;
    status?: TaskStatus;
    importance?: TaskImportance;
  },
  categoryId: number = -1,
  resources: { content: string }[] = []
) {
  const response = await axios.post(
    `${taskApiUrl}/`,
    {
      task: newTask,
      categoryId: categoryId,
      resources: resources,
    },
    { withCredentials: true }
  );

  return response.data.data;
}

const updateTaskDetailApi = async (taskdetail: TaskDetail) => {
  const { task, category, attendees, resources } = unwrapTaskDetail(taskdetail);
  const response = await axios.put(
    `${taskApiUrl}/${task.id}`,
    {
      task,
      category,
      attendees,
      resources,
    },
    { withCredentials: true }
  );

  return response.data;
};

const addNewTaskAttendeeApi = async (taskId: number, email: string) => {
  const response = await axios.put(
    `${taskApiUrl}/${taskId}/attendee`,
    {
      email,
    },
    { withCredentials: true }
  );

  return response.data.data;
};

const removeTaskAttendeeApi = async (taskId: number, attendee: Attendee) => {
  const response = await axios.delete(
    `${taskApiUrl}/${taskId}/attendee/${attendee.attendeeId}/${attendee.id}`,
    { withCredentials: true }
  );

  return response.data;
};

const syncTasksToGoogleCalendarApi = async () => {
  const response = await axios.post(`${taskApiUrl}/syncToGoogle`, undefined, {
    withCredentials: true,
  });

  return response.data;
};

const importEventFromGoogleCalendarApi = async (
  categoryId: number,
  start: Dayjs,
  end: Dayjs
) => {
  const response = await axios.post(
    `${taskApiUrl}/importFromGoogle/${categoryId}?start=${start.toISOString()}&end=${end.toISOString()}`,
    undefined,
    { withCredentials: true }
  );

  return response.data;
};

export {
  getTasksInRangeApi,
  getTaskDetailApi,
  createTaskApi,
  updateTaskDetailApi,
  addNewTaskAttendeeApi,
  removeTaskAttendeeApi,
  syncTasksToGoogleCalendarApi,
  importEventFromGoogleCalendarApi,
};
