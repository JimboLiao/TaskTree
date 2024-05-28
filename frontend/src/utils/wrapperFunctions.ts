import dayjs from "dayjs";
import {
  TaskInfoResponse,
  TaskInfo,
  StatusColor,
  ImportanceColor,
  TaskDetailResponse,
  TaskDetail,
  Attendee,
} from "../api/taskAPI";
import { Category, User, Task } from "../../../config/type";

function wrapTaskInfo(d: TaskInfoResponse): TaskInfo {
  const { category, ...task } = d;

  const categoryColor = category[0].color;
  const categoryId = category[0].id;
  const categoryName = category[0].name;

  return {
    ...task,
    title: task.title || "",
    description: task.description || "",
    reminder: task.reminder || 0,
    location: task.location || "",
    start: dayjs(task.start),
    end: dayjs(task.end),
    createTime: dayjs(task.createTime),
    updateTime: dayjs(task.updateTime),
    categoryId,
    categoryColor,
    categoryName,
    statusColor: StatusColor[d.status],
    importanceColor: ImportanceColor[d.importance],
  };
}

function wrapAttendee(attendee: { id: number; user: User }): Attendee {
  return { attendeeId: attendee.id, ...attendee.user };
}

function wrapTaskDetail(d: TaskDetailResponse): TaskDetail {
  const { category, attendee, resources, ...task } = d;
  const taskInfo = wrapTaskInfo({ category, ...task });
  return {
    ...taskInfo,
    attendees: attendee.map((a) => wrapAttendee(a)),
    resources,
  };
}

function unwrapTaskDetail(d: TaskDetail) {
  const { attendees, resources, ...t } = d;
  const category: Category = {
    id: t.categoryId,
    name: t.categoryName,
    color: t.categoryColor,
  };
  const att = attendees.map((a) => ({
    id: a.attendeeId,
    user: {
      id: a.id,
      email: a.email,
      username: a.username,
      createTime: a.createTime,
      updateTime: a.updateTime,
    },
  }));
  const task: Task = {
    id: t.id,
    title: t.title,
    description: t.description,
    start: t.start.toISOString(),
    end: t.end.toISOString(),
    isAllDay: t.isAllDay,
    status: t.status,
    importance: t.importance,
    reminder: t.reminder,
    location: t.location,
    createTime: t.createTime.toISOString(),
    updateTime: t.updateTime.toISOString(),
    parentTaskId: t.parentTaskId,
  };

  return { attendees: att, resources, category, task };
}

function wrapFullCalendarEvent(task: TaskInfo) {
  return {
    id: task.id.toString(),
    title: task.title,
    start: task.start.toDate(),
    end: task.end.toDate(),
    allDay: task.isAllDay,
    description: task.description,
    color: task.categoryColor,
  };
}

export {
  wrapTaskInfo,
  wrapAttendee,
  wrapTaskDetail,
  unwrapTaskDetail,
  wrapFullCalendarEvent,
};
