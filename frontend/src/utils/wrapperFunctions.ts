import dayjs from "dayjs";
import {
  TaskInfoResponse,
  TaskInfo,
  StatusColor,
  ImportanceColor,
  TaskDetailResponse,
  TaskDetail,
} from "../api/taskAPI";

function wrapTaskInfo(d: TaskInfoResponse): TaskInfo {
  const { category, resources, ...task } = d;

  const categoryColor = category[0].color;
  const categoryId = category[0].id;

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
    statusColor: StatusColor[d.status],
    importanceColor: ImportanceColor[d.importance],
    resources,
  };
}

function wrapTaskDetail(d: TaskDetailResponse): TaskDetail {
  const { category, attendee, ...task } = d;
  const taskInfo = wrapTaskInfo({ category, ...task });
  const categoryName = category[0].name;
  return { ...taskInfo, attendees: attendee.map((a) => a.user), categoryName };
}

export { wrapTaskInfo, wrapTaskDetail };
