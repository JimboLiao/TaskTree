import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  OutlinedInput,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import {
  AccessTime,
  AccountTreeOutlined,
  ListOutlined,
  LocationOnOutlined,
  MessageOutlined,
  NotesOutlined,
  NotificationsNoneOutlined,
  PeopleAltOutlined,
  TaskOutlined,
  Send,
} from "@mui/icons-material";

import Modal from "./Modal";
import { useState } from "react";
import TaskSelector from "./TaskSelector";
import { TaskImportance, TaskStatus } from "../data/data";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import ItemList from "./ItemList";
import DataEntry from "./DataEntry";
import ChatHistory from "./ChatHistory";
import RemindSelector from "./RemindSelector";

const StyledContainer = styled("div")(({ color }) => ({
  maxWidth: "756px",
  minWidth: "512px",
  overflow: "auto",
  borderRadius: "15px",
  borderTop: "16px solid",
  borderColor: `${color}`,
  padding: "16px",
}));

const StyledRow = styled(Box)({
  display: "flex",
  width: "100%",
});

const StyledHeader = styled(Box)({
  padding: "8px",
});

const StyledDataContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

const StyledData = styled(Box)({
  padding: "8px",
});

//@todo interface
// a prop to decide render which task
interface TaskTableModalProps {
  onModalClose: () => void;
  isModalOpen: boolean;
}
const TaskTableModal: React.FC<TaskTableModalProps> = ({
  onModalClose,
  isModalOpen,
}) => {
  const [taskSummary, setTaskSummary] = useState("task");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [importance, setImportance] = useState<TaskImportance>(
    TaskImportance.NORMAL
  );
  const [isAllday, setIsAllday] = useState(true);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs());
  const [location, setLocation] = useState("");
  const [isReminder, setIsReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState(10);
  const [attendees, setAttendees] = useState(["test@email.com"]);
  const [newAttendee, setNewAttendee] = useState("");
  const [subtasks, setSubtasks] = useState(["taskname"]);
  const [newSubtask, setNewSubtask] = useState("");
  const [resources, setResources] = useState(["resource 1"]);
  const [newResource, setNewResource] = useState("");
  const [notes, setNotes] = useState("old notes");
  const [messages, setMessages] = useState([
    { username: "user1", content: "message content" },
    { username: "user1", content: "message content" },
    {
      username: "user1",
      content:
        "message content message content message content message content message content message content message content message content message content message content ",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <>
      <Modal onClose={onModalClose} isOpen={isModalOpen}>
        <StyledContainer color="#1983FF">
          {/* Task name */}
          <StyledRow>
            <StyledHeader>
              <TaskOutlined />
            </StyledHeader>
            <StyledDataContainer>
              <StyledData>
                <Input
                  placeholder="Task"
                  fullWidth
                  disableUnderline
                  multiline
                  value={taskSummary}
                  onChange={handleChangeTaskSummary}
                />
              </StyledData>
              <StyledData>
                <TaskSelector
                  category={category}
                  status={status}
                  importance={importance}
                  onCategory={handleChangeCategory}
                  onStatus={handleChangeStatus}
                  onImportance={handleChangeImportance}
                />
              </StyledData>
            </StyledDataContainer>
          </StyledRow>

          {/* Time */}
          <StyledRow>
            <StyledHeader>
              <AccessTime />
            </StyledHeader>
            <StyledDataContainer>
              <StyledData>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: 20 },
                          paddingTop: "0px",
                          paddingBottom: "0px",
                        }}
                        value={isAllday}
                        onChange={handleChangeAllday}
                      />
                    }
                    label="All Day"
                  />
                </FormGroup>
              </StyledData>
              <StyledData>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleChangeStartDate}
                  sx={{ paddingRight: "8px", width: "160px" }}
                  slotProps={{ field: { size: "small" } }}
                />
                {isAllday && (
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={handleChangeEndDate}
                    sx={{ paddingRight: "8px", width: "160px" }}
                    slotProps={{ field: { size: "small" } }}
                  />
                )}
              </StyledData>

              {!isAllday && (
                <>
                  <StyledData>
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={handleChangeStartTime}
                      sx={{ paddingRight: "8px", width: "160px" }}
                      slotProps={{ field: { size: "small" } }}
                    />

                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={handleChangeEndTime}
                      sx={{ paddingRight: "8px", width: "160px" }}
                      slotProps={{ field: { size: "small" } }}
                    />
                  </StyledData>
                </>
              )}
            </StyledDataContainer>
          </StyledRow>

          {/* Location */}
          <StyledRow>
            <StyledHeader>
              <LocationOnOutlined />
            </StyledHeader>
            <StyledDataContainer>
              <StyledData>
                <Input
                  placeholder="Location"
                  fullWidth
                  value={location}
                  onChange={handleChangeLocation}
                />
              </StyledData>
            </StyledDataContainer>
          </StyledRow>

          {/* Reminder */}
          <StyledRow>
            <StyledHeader>
              <NotificationsNoneOutlined />
            </StyledHeader>
            <StyledDataContainer>
              <StyledData>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": { fontSize: 20 },
                          paddingTop: "0px",
                          paddingBottom: "0px",
                        }}
                        value={isReminder}
                        onChange={handleChangeIsReminder}
                      />
                    }
                    label="Reminder"
                  />
                </FormGroup>
              </StyledData>
              {isReminder && (
                <StyledData sx={{ display: "flex", alignItems: "baseline" }}>
                  <RemindSelector
                    reminderTime={reminderTime}
                    onChangeReminderTime={handleChangeReminderTime}
                  />
                </StyledData>
              )}
            </StyledDataContainer>
          </StyledRow>

          {/* Attendees */}
          <StyledRow>
            <StyledHeader>
              <PeopleAltOutlined />
            </StyledHeader>
            <StyledDataContainer>
              {attendees.length !== 0 && (
                <StyledData display="flex" flexWrap="wrap">
                  <ItemList items={attendees} onDelete={handleDeleteAttendee} />
                </StyledData>
              )}

              <StyledData>
                <DataEntry
                  newData={newAttendee}
                  placeholder="Attendee"
                  onChangeNewData={handleNewAttendee}
                  onAddNewData={handleAddAttendee}
                  disabledCondition={newAttendee === ""}
                />
              </StyledData>
            </StyledDataContainer>
          </StyledRow>

          {/* Subtasks */}
          <StyledRow>
            <StyledHeader>
              <AccountTreeOutlined />
            </StyledHeader>
            <StyledDataContainer>
              {subtasks.length !== 0 && (
                <StyledData display="flex" flexWrap="wrap">
                  <ItemList items={subtasks} onDelete={handleDeleteSubtask} />
                </StyledData>
              )}

              <StyledData>
                <DataEntry
                  newData={newSubtask}
                  placeholder="Subtask"
                  onChangeNewData={handleNewSubtask}
                  onAddNewData={handleAddSubtask}
                  disabledCondition={newSubtask === ""}
                />
              </StyledData>
            </StyledDataContainer>
          </StyledRow>

          {/* Resources */}
          <StyledRow>
            <StyledHeader>
              <ListOutlined />
            </StyledHeader>
            <StyledDataContainer>
              {resources.length !== 0 && (
                <StyledData display="flex" flexWrap="wrap">
                  <ItemList items={resources} onDelete={handleDeleteResource} />
                </StyledData>
              )}

              <StyledData>
                <DataEntry
                  newData={newResource}
                  placeholder="Resource"
                  onChangeNewData={handleNewResource}
                  onAddNewData={handleAddResource}
                  disabledCondition={newResource === ""}
                />
              </StyledData>
            </StyledDataContainer>
          </StyledRow>

          {/* Notes */}
          <StyledRow>
            <StyledHeader>
              <NotesOutlined />
            </StyledHeader>
            <StyledDataContainer>
              <StyledData>
                <OutlinedInput
                  fullWidth
                  multiline
                  placeholder="Notes"
                  value={notes}
                  onChange={handleChangeNotes}
                />
              </StyledData>
            </StyledDataContainer>
          </StyledRow>

          {/* Chatroom */}
          <StyledRow>
            <StyledHeader>
              <MessageOutlined />
            </StyledHeader>
            <StyledDataContainer>
              <StyledData>
                <ChatHistory messages={messages} />
              </StyledData>
              <StyledData display="flex" alignItems="center">
                <OutlinedInput
                  fullWidth
                  multiline
                  placeholder="message..."
                  value={newMessage}
                  onChange={handleChangeNewMessages}
                />
                <IconButton
                  sx={{ padding: "10px" }}
                  onClick={handleSendMessage}
                  disabled={newMessage === ""}
                >
                  <Send />
                </IconButton>
              </StyledData>
            </StyledDataContainer>
          </StyledRow>
        </StyledContainer>
      </Modal>
    </>
  );

  function handleChangeTaskSummary(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskSummary(event.target.value);
  }
  function handleChangeCategory(event: SelectChangeEvent) {
    setCategory(event.target.value);
  }
  function handleChangeStatus(event: SelectChangeEvent<TaskStatus>) {
    setStatus(event.target.value as TaskStatus);
  }
  function handleChangeImportance(event: SelectChangeEvent<TaskImportance>) {
    setImportance(event.target.value as TaskImportance);
  }
  function handleChangeAllday(event: React.ChangeEvent<HTMLInputElement>) {
    setIsAllday(event.target.checked);
  }
  function handleChangeStartDate(newDate: Dayjs | null) {
    setStartDate(newDate);
  }
  function handleChangeEndDate(newDate: Dayjs | null) {
    setEndDate(newDate);
  }
  function handleChangeStartTime(newTime: Dayjs | null) {
    setStartTime(newTime);
  }
  function handleChangeEndTime(newTime: Dayjs | null) {
    setEndTime(newTime);
  }
  function handleChangeLocation(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
  }
  function handleChangeIsReminder(event: React.ChangeEvent<HTMLInputElement>) {
    setIsReminder(event.target.checked);
  }
  function handleChangeReminderTime(event: SelectChangeEvent<number>) {
    setReminderTime(event.target.value as number);
  }
  function handleNewAttendee(event: React.ChangeEvent<HTMLInputElement>) {
    setNewAttendee(event.target.value);
  }
  function handleAddAttendee() {
    if (newAttendee === "") return;
    setAttendees([...attendees, newAttendee]);
    setNewAttendee("");
  }
  function handleDeleteAttendee(deleteIndex: number) {
    setAttendees(attendees.filter((_, index) => index !== deleteIndex));
  }
  function handleNewSubtask(event: React.ChangeEvent<HTMLInputElement>) {
    setNewSubtask(event.target.value);
  }
  function handleAddSubtask() {
    if (newSubtask === "") return;
    setSubtasks([...subtasks, newSubtask]);
    setNewSubtask("");
  }
  function handleDeleteSubtask(deleteIndex: number) {
    setSubtasks(subtasks.filter((_, index) => index !== deleteIndex));
  }
  function handleNewResource(event: React.ChangeEvent<HTMLInputElement>) {
    setNewResource(event.target.value);
  }
  function handleAddResource() {
    if (newResource === "") return;
    setResources([...resources, newResource]);
    setNewResource("");
  }
  function handleDeleteResource(deleteIndex: number) {
    setResources(resources.filter((_, index) => index !== deleteIndex));
  }
  function handleChangeNotes(event: React.ChangeEvent<HTMLInputElement>) {
    setNotes(event.target.value);
  }
  function handleChangeNewMessages(event: React.ChangeEvent<HTMLInputElement>) {
    setNewMessage(event.target.value);
  }
  function handleSendMessage() {
    if (!newMessage) return;

    //@todo user name should be the login member's name
    setMessages([...messages, { username: "user", content: `${newMessage}` }]);
    setNewMessage("");
  }
};

export default TaskTableModal;
