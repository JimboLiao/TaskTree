import { calendar_v3 } from "googleapis";
import { Task } from "../entities/task";

function categoryToCalendar(category: {
  id?: number;
  name?: string;
  gCalendarId?: string | null;
  userId?: number;
}): calendar_v3.Schema$Calendar {
  return { summary: category.name };
}

function taskToEvent(task: Task): calendar_v3.Schema$Event {
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

function eventToTask(event: calendar_v3.Schema$Event): Task {
  let task: Task = {} as Task;

  task.title = event.summary;

  if (event.start === undefined || event.end === undefined) {
    throw new Error("Event start or end not found");
  }
  // Check if the event is all-day
  if (event.start.date || event.end.date) {
    task.isAllDay = true;
  } else {
    task.isAllDay = false;
  }
  let startTime = event.start.dateTime || event.start.date;
  let endTime = event.end.dateTime || event.end.date;
  if (!startTime || !endTime) {
    throw new Error("Event start or end not found");
  }
  task.start = new Date(startTime);
  task.end = new Date(endTime);
  task.description = event.description;
  task.location = event.location;

  // Extract reminder information
  if (
    event.reminders &&
    !event.reminders.useDefault &&
    event.reminders.overrides
  ) {
    let reminder = event.reminders.overrides.find(
      (override) => override.method === "email"
    );
    if (reminder) {
      task.reminder = reminder.minutes;
    }
  }

  return task;
}

export { categoryToCalendar, taskToEvent, eventToTask };
