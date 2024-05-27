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
import { useEffect, useState } from "react";
import TaskSelector from "./TaskSelector";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import ItemList from "./ItemList";
import DataEntry from "./DataEntry";
import ChatHistory from "./ChatHistory";
import RemindSelector from "./RemindSelector";
import {
  addNewTaskAttendeeApi,
  getTaskDetailApi,
  removeTaskAttendeeApi,
  TaskDetail,
  TaskImportance,
  TaskStatus,
  updateTaskDetailApi,
} from "../api/taskAPI";
import { Category } from "../api/categoryAPI";
import { wrapAttendee } from "../utils/wrapperFunctions";

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
  taskId: number | null;
}
const TaskTableModal: React.FC<TaskTableModalProps> = ({
  onModalClose,
  isModalOpen,
  taskId,
}) => {
  useEffect(() => {
    async function fetchTaskDetailAndInitialize() {
      try {
        if (!taskId) return;
        const t = await getTaskDetailApi(taskId);
        setTaskDetail(t);
        setIsReminder(t.reminder !== 0);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTaskDetailAndInitialize();
  }, [taskId]);

  const [taskDetail, setTaskDetail] = useState<TaskDetail | null>(null);
  const [isReminder, setIsReminder] = useState(false);
  const [newAttendee, setNewAttendee] = useState("");
  const [newResource, setNewResource] = useState("");
  //@todo subtask feature
  const [subtasks, setSubtasks] = useState(["taskname"]);
  const [newSubtask, setNewSubtask] = useState("");
  //@todo messages feature
  const [messages, setMessages] = useState([
    { username: "user1", content: "message content" },
    { username: "user1", content: "message content" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <>
      <Modal onClose={handleClose} isOpen={isModalOpen}>
        {taskDetail ? (
          <StyledContainer color={taskDetail.categoryColor}>
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
                    value={taskDetail.title}
                    onChange={handleChangeTaskTitle}
                  />
                </StyledData>
                <StyledData>
                  <TaskSelector
                    categoryId={taskDetail.categoryId.toString()}
                    status={taskDetail.status}
                    importance={taskDetail.importance}
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
                          value={taskDetail.isAllDay}
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
                    value={taskDetail.start}
                    onChange={handleChangeStartDate}
                    sx={{ paddingRight: "8px", width: "160px" }}
                    slotProps={{ field: { size: "small" } }}
                  />
                  {taskDetail.isAllDay && (
                    <DatePicker
                      label="End Date"
                      value={taskDetail.end}
                      onChange={handleChangeEndDate}
                      sx={{ paddingRight: "8px", width: "160px" }}
                      slotProps={{ field: { size: "small" } }}
                    />
                  )}
                </StyledData>

                {!taskDetail.isAllDay && (
                  <>
                    <StyledData>
                      <TimePicker
                        label="Start Time"
                        value={taskDetail.start}
                        onChange={handleChangeStartTime}
                        sx={{ paddingRight: "8px", width: "160px" }}
                        slotProps={{ field: { size: "small" } }}
                      />

                      <TimePicker
                        label="End Time"
                        value={taskDetail.end}
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
                    value={taskDetail.location}
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
                          checked={isReminder}
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
                      reminderTime={taskDetail.reminder}
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
                {taskDetail.attendees.length !== 0 && (
                  <StyledData display="flex" flexWrap="wrap">
                    <ItemList
                      items={taskDetail.attendees.map((a) => a.email)}
                      onDelete={handleDeleteAttendee}
                    />
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
                {/* @todo subtask feature */}
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
                {taskDetail.resources.length !== 0 && (
                  <StyledData display="flex" flexWrap="wrap">
                    <ItemList
                      items={taskDetail.resources.map((r) => r.content)}
                      onDelete={handleDeleteResource}
                    />
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
                    value={taskDetail.description}
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
                  {/* @todo chatroom feature */}
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
        ) : (
          // loading taskDetail
          <StyledContainer color="#FFFFFF">
            <div>Loading...</div>
          </StyledContainer>
        )}
      </Modal>
    </>
  );

  function handleChangeTaskTitle(event: React.ChangeEvent<HTMLInputElement>) {
    if (!taskDetail) return;
    const t = { ...taskDetail, title: event.target.value };
    setTaskDetail(t);
  }
  function handleChangeCategory(newCategory: Category) {
    if (!taskDetail) return;
    const t = {
      ...taskDetail,
      categoryName: newCategory.name,
      categoryId: newCategory.id,
      categoryColor: newCategory.color,
    };

    setTaskDetail(t);
  }
  function handleChangeStatus(event: SelectChangeEvent<TaskStatus>) {
    if (!taskDetail) return;
    const t = { ...taskDetail, status: event.target.value as TaskStatus };
    setTaskDetail(t);
  }
  function handleChangeImportance(event: SelectChangeEvent<TaskImportance>) {
    if (!taskDetail) return;
    const t = {
      ...taskDetail,
      importance: event.target.value as TaskImportance,
    };
    setTaskDetail(t);
  }
  function handleChangeAllday(event: React.ChangeEvent<HTMLInputElement>) {
    if (!taskDetail) return;
    // set default for end
    let e = taskDetail.start.add(1, "hour");
    if (event.target.checked) {
      e = taskDetail.start.add(1, "day");
    }

    const t = {
      ...taskDetail,
      isAllDay: false,
      end: e,
    };
    setTaskDetail(t);
  }
  function handleChangeStartDate(newDate: Dayjs | null) {
    if (!newDate || !taskDetail) return;
    const t = {
      ...taskDetail,
      start: newDate,
    };
    setTaskDetail(t);
  }
  function handleChangeEndDate(newDate: Dayjs | null) {
    if (!newDate || !taskDetail) return;
    const t = {
      ...taskDetail,
      end: newDate,
    };
    setTaskDetail(t);
  }
  function handleChangeStartTime(newTime: Dayjs | null) {
    if (!newTime || !taskDetail) return;
    const t = {
      ...taskDetail,
      start: newTime,
    };
    setTaskDetail(t);
  }
  function handleChangeEndTime(newTime: Dayjs | null) {
    if (!newTime || !taskDetail) return;
    const t = {
      ...taskDetail,
      end: newTime,
    };
    setTaskDetail(t);
  }
  function handleChangeLocation(event: React.ChangeEvent<HTMLInputElement>) {
    if (!taskDetail) return;
    const t = { ...taskDetail, location: event.target.value };
    setTaskDetail(t);
  }
  function handleChangeIsReminder(event: React.ChangeEvent<HTMLInputElement>) {
    setIsReminder(event.target.checked);
  }
  function handleChangeReminderTime(event: SelectChangeEvent<number>) {
    if (!taskDetail) return;
    const t = { ...taskDetail, reminderTime: event.target.value as number };
    setTaskDetail(t);
  }
  function handleNewAttendee(event: React.ChangeEvent<HTMLInputElement>) {
    setNewAttendee(event.target.value);
  }
  function handleAddAttendee() {
    if (!taskDetail) return;
    if (newAttendee === "") return;

    // check attendee is a email address
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(newAttendee)) {
      alert("Please enter a valid email address");
      setNewAttendee("");
      return;
    }

    // add new attendee
    addNewTaskAttendeeApi(taskDetail.id, newAttendee)
      .then((user) => {
        if (!user) {
          alert("Attendee not found");
          setNewAttendee("");
          return;
        }
        const newAtt = [...taskDetail.attendees, wrapAttendee(user)];
        const t = { ...taskDetail, attendees: newAtt };
        setTaskDetail(t);
        setNewAttendee("");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleDeleteAttendee(deleteIndex: number) {
    if (!taskDetail) return;
    if (taskDetail.attendees.length === 1) {
      alert("Task must have at least one attendee");
      return;
    }

    const deleteAttendee = taskDetail.attendees[deleteIndex];
    removeTaskAttendeeApi(taskDetail.id, deleteAttendee)
      .then(() => {
        const att = taskDetail.attendees.filter(
          (_, index) => index !== deleteIndex
        );
        const t = { ...taskDetail, attendees: att };
        setTaskDetail(t);
      })
      .catch((err) => {
        console.error(err);
      });
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
    if (!taskDetail) return;
    if (newResource === "") return;
    setTaskDetail({
      ...taskDetail,
      resources: [...taskDetail.resources, { id: 0, content: newResource }],
    });
    setNewResource("");
  }
  function handleDeleteResource(deleteIndex: number) {
    if (!taskDetail) return;
    setTaskDetail({
      ...taskDetail,
      resources: taskDetail.resources.filter(
        (_, index) => index !== deleteIndex
      ),
    });
  }
  function handleChangeNotes(event: React.ChangeEvent<HTMLInputElement>) {
    if (!taskDetail) return;
    setTaskDetail({ ...taskDetail, description: event.target.value });
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
  function handleClose() {
    if (!taskDetail) return;
    updateTaskDetailApi(taskDetail)
      .then(() => {
        setTaskDetail(null);
        onModalClose();
      })
      .catch((err) => {
        console.error(err);
        onModalClose();
      });
  }
};

export default TaskTableModal;
