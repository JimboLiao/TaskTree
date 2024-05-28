import { Button, CircularProgress, Typography, styled } from "@mui/material";
import Modal from "./Modal";
import CategorySelector from "./CategorySelector";
import { Category } from "../api/categoryAPI";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { importEventFromGoogleCalendarApi } from "../api/taskAPI";
import { useTaskInfo } from "../contexts/TaskInfoContext";

const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "50px",
});

const DatePickerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: "20px",
  paddingBottom: "20px",
  gap: "15px",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  marginTop: "20px",
});

interface ImportEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportEventsModal: React.FC<ImportEventsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { fetchTaskInfos } = useTaskInfo();
  const [categoryId, setCategoryId] = useState("");
  const [start, setStart] = useState<Dayjs>(dayjs().startOf("day"));
  const [end, setEnd] = useState<Dayjs>(dayjs().add(1, "day").startOf("day"));
  const [isImporting, setIsImporting] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <StyledContainer>
          <Typography variant="h4">Import Events</Typography>
          <CategorySelector
            categoryId={categoryId}
            onCategory={handleCategory}
          />
          <DatePickerContainer>
            <DatePicker
              label="Start Date"
              value={start}
              onChange={handleChangeStartDate}
              sx={{ width: "100%" }}
            />
            <DatePicker
              label="End Date"
              value={end}
              onChange={handleChangeEndDate}
              sx={{ width: "100%" }}
            />
          </DatePickerContainer>
          {!categoryId && (
            <Typography color="error" variant="caption">
              * Please select a category to proceed.
            </Typography>
          )}
          <ButtonContainer>
            <Button variant="outlined" onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleConfirm} color="primary">
              Confirm
              {isImporting && (
                <CircularProgress
                  size={16}
                  sx={{ marginLeft: "8px" }}
                  color="inherit"
                />
              )}
            </Button>
          </ButtonContainer>
        </StyledContainer>
      </Modal>
    </>
  );

  function handleCategory(newCategory: Category) {
    setCategoryId(newCategory.id.toString());
  }
  function handleCancel() {
    setCategoryId("");
    onClose();
  }

  function handleChangeStartDate(date: Dayjs | null) {
    if (!date) return;
    setStart(date);
  }

  function handleChangeEndDate(date: Dayjs | null) {
    if (!date) return;
    setEnd(date);
  }

  function handleConfirm() {
    setIsImporting(true);
    importEventFromGoogleCalendarApi(parseInt(categoryId), start, end)
      .then(() => {
        setIsImporting(false);
        fetchTaskInfos();
        alert("Import successful!");
        setCategoryId("");
        onClose();
      })
      .catch((err) => {
        console.log("Import events failed");
        console.error(err);
      });
  }
};

export default ImportEventsModal;
