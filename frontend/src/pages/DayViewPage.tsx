import { Box, styled } from "@mui/material";
import DayViewTitle from "../components/DayViewTitle";
import TaskToolbar from "../components/TaskToolbar";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import TimeToolbar from "../components/TimeToolbar";
import { useRef, useState } from "react";
import TaskList from "../components/TaskList";
import { useTaskInfo } from "../contexts/TaskInfoContext";
import dayjs from "dayjs";

const StyledContainer = styled("div")({
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  paddingTop: "20px",
  paddingBottom: "20px",
});

const StyledTaskSection = styled("section")({
  minWidth: "600px",
  maxWidth: "850px",
  height: "100%",
  flexGrow: 2,
  display: "flex",
  flexDirection: "column",
  paddingLeft: "50px",
  paddingRight: "50px",
});
const StyledScheduleSection = styled("section")({
  height: "100%",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  paddingLeft: "50px",
  paddingRight: "50px",
});

const DayViewPage = () => {
  const { taskInfos, setStartDate, setEndDate } = useTaskInfo();
  const [date, setDate] = useState(dayjs());
  const calendarRef = useRef<FullCalendar | null>(null);

  function setNewDate(newDate: Date) {
    const d = dayjs(newDate).startOf("day");
    setDate(d);
    setStartDate(d);
    setEndDate(d.add(1, "day"));
  }

  function handleTodaybtn() {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) {
      console.error("calendarApi failed");
      return;
    }
    calendarApi.today();
    setNewDate(calendarApi.getDate());
  }

  function handleNextDay() {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) {
      console.error("calendarApi failed");
      return;
    }
    calendarApi.next();
    setNewDate(calendarApi.getDate());
  }

  function handlePrevDay() {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) {
      console.error("calendarApi failed");
      return;
    }
    calendarApi.prev();
    setNewDate(calendarApi.getDate());
  }

  return (
    <StyledContainer>
      <StyledTaskSection>
        <DayViewTitle onToday={handleTodaybtn} />
        <TaskToolbar />
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflow: "auto",
          }}
        >
          <TaskList tasks={taskInfos} />
        </Box>
      </StyledTaskSection>

      <StyledScheduleSection>
        <TimeToolbar
          title={date.format("MMM D, YYYY")}
          onNext={handleNextDay}
          onPrev={handlePrevDay}
        />
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridDay"
          height="100%"
          headerToolbar={false}
          initialDate={new Date()}
          ref={calendarRef}
          // nowIndicator={true}
        />
      </StyledScheduleSection>
    </StyledContainer>
  );
};

export default DayViewPage;
