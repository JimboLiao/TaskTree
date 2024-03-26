import { Box, styled } from "@mui/material";
import DayViewTitle from "../components/DayViewTitle";
import TaskToolbar from "../components/TaskToolbar";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import TimeToolbar from "../components/TimeToolbar";
import { useRef, useState } from "react";
import TaskList from "../components/TaskList";
import { tasks } from "../data/data";

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
  const calendarRef = useRef<FullCalendar | null>(null);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const [date, setDate] = useState(formatter.format(new Date()));

  function handleTodaybtn() {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) {
      console.error("calendarApi failed");
      return;
    }
    calendarApi.today();
    setDate(formatter.format(calendarApi.getDate()));
  }

  function handleAddTask() {
    //@todo add a new task
    console.log("add task");
  }

  function handleNextDay() {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) {
      console.error("calendarApi failed");
      return;
    }
    calendarApi.next();
    setDate(formatter.format(calendarApi.getDate()));
  }

  function handlePrevDay() {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) {
      console.error("calendarApi failed");
      return;
    }
    calendarApi.prev();
    setDate(formatter.format(calendarApi.getDate()));
  }

  return (
    <StyledContainer>
      <StyledTaskSection>
        <DayViewTitle onToday={handleTodaybtn} />
        <TaskToolbar onAddTask={handleAddTask} />
        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflow: "auto",
          }}
        >
          <TaskList tasks={tasks} />
        </Box>
      </StyledTaskSection>

      <StyledScheduleSection>
        <TimeToolbar
          title={date.toString()}
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
