import { Box, styled } from "@mui/material";
import WorkspaceTitle from "../components/WorkspaceTitle";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  paddingTop: "20px",
  paddingBottom: "20px",
  paddingLeft: "50px",
  paddingRight: "50px",
});

const CalendarViewPage = () => {
  return (
    <StyledContainer>
      <WorkspaceTitle title="Calendar" />
      <Box sx={{ width: "100%", height: "100%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today sync import",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          customButtons={{
            sync: {
              text: "Sync",
              click: handleSync,
              hint: "Sync data to Google Calendar",
            },
            import: {
              text: "Import",
              click: handleImport,
              hint: "Import data from Google Calendar",
            },
          }}
          height="100%"
          initialView="dayGridMonth"
        />
      </Box>
    </StyledContainer>
  );

  function handleSync() {
    // @todo sync data to google calendar
  }
  function handleImport() {
    // @todo import data from google calendar
  }
};

export default CalendarViewPage;
