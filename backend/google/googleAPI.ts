import { google, calendar_v3 } from "googleapis";
// googleapi calendar documentation:
// https://googleapis.dev/nodejs/googleapis/latest/calendar/classes/Calendar.html

import dotenv from "dotenv";
dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, GOOGLE_REDIRECT_URL } =
  process.env;

const googleOAuthClient = new google.auth.OAuth2({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET_KEY,
  redirectUri: GOOGLE_REDIRECT_URL,
});

google.options({ auth: googleOAuthClient });
const googleCalendar = google.calendar("v3");

async function getCalendar({
  refreshToken,
  calendarId,
}: {
  refreshToken: string;
  calendarId: string;
}) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    const response = await googleCalendar.calendars.get({
      // Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
      calendarId: calendarId,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function insertCalendar({
  refreshToken,
  calendarInfo,
}: {
  refreshToken: string;
  calendarInfo: calendar_v3.Schema$Calendar;
}) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    // request body parameters
    // {
    //   "conferenceProperties": {},
    //   "description": "my_description",
    //   "etag": "my_etag",
    //   "id": "my_id",
    //   "kind": "my_kind",
    //   "location": "my_location",
    //   "summary": "my_summary",
    //   "timeZone": "my_timeZone"
    // }
    const response = await googleCalendar.calendars.insert({
      requestBody: calendarInfo,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function patchCalendar({
  refreshToken,
  calendarId,
  calendarInfo,
}: {
  refreshToken: string;
  calendarId: string;
  calendarInfo: calendar_v3.Schema$Calendar;
}) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    const response = await googleCalendar.calendars.patch({
      calendarId: calendarId,
      requestBody: calendarInfo,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function getCalendarList({
  refreshToken,
  calendarId,
}: {
  refreshToken: string;
  calendarId: string;
}) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    // Example response
    // {
    //   "accessRole": "my_accessRole",
    //   "backgroundColor": "my_backgroundColor",
    //   "colorId": "my_colorId",
    //   "conferenceProperties": {},
    //   "defaultReminders": [],
    //   "deleted": false,
    //   "description": "my_description",
    //   "etag": "my_etag",
    //   "foregroundColor": "my_foregroundColor",
    //   "hidden": false,
    //   "id": "my_id",
    //   "kind": "my_kind",
    //   "location": "my_location",
    //   "notificationSettings": {},
    //   "primary": false,
    //   "selected": false,
    //   "summary": "my_summary",
    //   "summaryOverride": "my_summaryOverride",
    //   "timeZone": "my_timeZone"
    // }
    const response = await googleCalendar.calendarList.get({ calendarId });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function patchCalendarList({
  refreshToken,
  calendarId,
  calendarListInfo,
}: {
  refreshToken: string;
  calendarId: string;
  calendarListInfo: calendar_v3.Schema$CalendarListEntry;
}) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    const response = await googleCalendar.calendarList.patch({
      // Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
      calendarId: calendarId,
      // Whether to use the foregroundColor and backgroundColor fields to write the calendar colors (RGB). If this feature is used, the index-based colorId field will be set to the best matching option automatically. Optional. The default is False.
      colorRgbFormat: true,
      requestBody: calendarListInfo,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function listCalendarList({ refreshToken }: { refreshToken: string }) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });
    const response = await googleCalendar.calendarList.list();
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function getEvent({
  refreshToken,
  calendarId,
  eventId,
}: {
  refreshToken: string;
  calendarId: string;
  eventId: string;
}) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    const response = await googleCalendar.events.get({
      calendarId: calendarId,
      eventId: eventId,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function insertEvent({
  refreshToken,
  calendarId,
  eventInfo,
}: {
  refreshToken: string;
  calendarId: string;
  eventInfo: calendar_v3.Schema$Event;
}) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    const response = await googleCalendar.events.insert({
      calendarId: calendarId,

      // Whether API client performing operation supports event attachments. Optional. The default is False.
      // supportsAttachments: 'placeholder-value',

      requestBody: eventInfo,
    });

    // Example response
    // {
    //   "anyoneCanAddSelf": false,
    //   "attachments": [],
    //   "attendees": [],
    //   "attendeesOmitted": false,
    //   "colorId": "my_colorId",
    //   "conferenceData": {},
    //   "created": "my_created",
    //   "creator": {},
    //   "description": "my_description",
    //   "end": {},
    //   "endTimeUnspecified": false,
    //   "etag": "my_etag",
    //   "eventType": "my_eventType",
    //   "extendedProperties": {},
    //   "gadget": {},
    //   "guestsCanInviteOthers": false,
    //   "guestsCanModify": false,
    //   "guestsCanSeeOtherGuests": false,
    //   "hangoutLink": "my_hangoutLink",
    //   "htmlLink": "my_htmlLink",
    //   "iCalUID": "my_iCalUID",
    //   "id": "my_id",
    //   "kind": "my_kind",
    //   "location": "my_location",
    //   "locked": false,
    //   "organizer": {},
    //   "originalStartTime": {},
    //   "privateCopy": false,
    //   "recurrence": [],
    //   "recurringEventId": "my_recurringEventId",
    //   "reminders": {},
    //   "sequence": 0,
    //   "source": {},
    //   "start": {},
    //   "status": "my_status",
    //   "summary": "my_summary",
    //   "transparency": "my_transparency",
    //   "updated": "my_updated",
    //   "visibility": "my_visibility"
    // }
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function patchEvent({
  refreshToken,
  calendarId,
  eventId,
  eventInfo,
}: {
  refreshToken: string;
  calendarId: string;
  eventId: string;
  eventInfo: calendar_v3.Schema$Event;
}) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    const response = await googleCalendar.events.patch({
      calendarId: calendarId,
      eventId: eventId,
      requestBody: eventInfo,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function deleteEvent({
  refreshToken,
  calendarId,
  eventId,
}: {
  refreshToken: string;
  calendarId: string;
  eventId: string;
}) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    const response = await googleCalendar.events.delete({
      calendarId: calendarId,
      eventId: eventId,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function listEvent({
  refreshToken,
  calendarId,
  q,
  timeMax,
  timeMin,
}: {
  refreshToken: string;
  calendarId: string;
  q?: string;
  timeMax?: string;
  timeMin?: string;
}) {
  try {
    googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    const response = await googleCalendar.events.list({
      calendarId: calendarId,
      // Free text search terms to find events that match these terms in any field, except for extended properties. Optional.
      q: q,
      // Upper bound (exclusive) for an event's start time to filter by. Optional. The default is not to filter by start time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMin is set, timeMax must be greater than timeMin.
      timeMax: timeMax,
      // Lower bound (exclusive) for an event's end time to filter by. Optional. The default is not to filter by end time. Must be an RFC3339 timestamp with mandatory time zone offset, for example, 2011-06-03T10:00:00-07:00, 2011-06-03T10:00:00Z. Milliseconds may be provided but are ignored. If timeMax is set, timeMin must be smaller than timeMax.
      timeMin: timeMin,
    });

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export {
  googleOAuthClient,
  googleCalendar,
  getCalendar,
  insertCalendar,
  patchCalendar,
  getCalendarList,
  patchCalendarList,
  listCalendarList,
  getEvent,
  insertEvent,
  patchEvent,
  deleteEvent,
  listEvent,
};
