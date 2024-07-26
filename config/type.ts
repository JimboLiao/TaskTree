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

export type Category = {
  id: number;
  name: string;
  color: string;
};

export type Resource = {
  id: number;
  content: string;
};

export type User = {
  id: number;
  email: string;
  username: string | null;
  createTime: string;
  updateTime: string;
};

export type ChatRoom = {
  id: number;
  name: string;
};

export type Message = {
  id: number;
  content: string;
  createTime: string;
};
