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
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="100%"
          initialView="dayGridMonth"
        />
      </Box>
    </StyledContainer>
  );
};

export default CalendarViewPage;
