import { calendar_v3 } from "googleapis";
import { TaskImportance, TaskStatus } from "../entities/task";
function categoryToCalendar(category: {
  id?: number;
  name?: string;
  gCalendarId?: string | null;
  userId?: number;
}): calendar_v3.Schema$Calendar {
  return { summary: category.name };
}

function taskToEvent(task: {
  id?: number;
  title?: string | null;
  start: Date;
  end: Date;
  description?: string | null;
  isAllDay?: boolean;
  status?: TaskStatus;
  importance?: TaskImportance;
  reminder?: number | null;
  location?: string | null;
  createTime?: Date;
  updateTime?: Date;
}): calendar_v3.Schema$Event {
  let start = undefined;
  let end = undefined;
  if (task.isAllDay) {
    start = { date: task.start.toISOString().slice(0, 10) };
    end = { date: task.end.toISOString().slice(0, 10) };
  } else {
    start = { dateTime: task.start.toISOString() };
    end = { dateTime: task.end.toISOString() };
  }

  let reminders: {
    overrides?: calendar_v3.Schema$EventReminder[];
    useDefault?: boolean;
  } = { useDefault: true };

  if (task.reminder) {
    reminders.useDefault = false;
    reminders.overrides = [{ method: "email", minutes: task.reminder }];
  }

  return {
    description: task.description,
    end: end,
    location: task.location,
    reminders: reminders,
    start: start,
    summary: task.title,
  };
}

export { categoryToCalendar, taskToEvent };
