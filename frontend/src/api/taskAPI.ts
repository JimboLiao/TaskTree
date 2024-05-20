import axios from "axios";
import { Category } from "./categoryAPI";
import { wrapTaskDetail, wrapTaskInfo } from "../utils/wrapperFunctions";
import { User } from "./userAPI";
import { Dayjs } from "dayjs";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
const taskApiUrl = `${apiUrl}/tasks`;

export enum TaskStatus {
  TODO = "TODO",
  DOING = "DOING",
  DONE = "DONE",
}

export enum TaskImportance {
  HIGH = "HIGH",
  NORMAL = "NORMAL",
  LOW = "LOW",
}

export type Task = {
  id: number;
  title: string | null;
  start: string;
  end: string;
  description: string | null;
  isAllDay: boolean;
  status: TaskStatus;
  importance: TaskImportance;
  reminder: number | null;
  parentTaskId: number | null;
  location: string | null;
  createTime: string;
  updateTime: string;
};

export type Resource = {
  id: number;
  content: string;
  taskid: number;
};

export type TaskInfoResponse = Task & { category: Category[] } & {
  resources: Resource[];
};

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
  statusColor: string;
  importanceColor: string;
  resources: Resource[];
};

export type TaskDetailResponse = TaskInfoResponse & {
  attendee: { id: number; user: User }[];
};

export type TaskDetail = TaskInfo & {
  categoryName: string;
  attendees: User[];
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
  syncTasksToGoogleCalendarApi,
  importEventFromGoogleCalendarApi,
};
