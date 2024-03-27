import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface RemindSelectorProps {
  reminderTime: number;
  onChangeReminderTime: (event: SelectChangeEvent<number>) => void;
}

const RemindSelector: React.FC<RemindSelectorProps> = ({
  reminderTime,
  onChangeReminderTime,
}) => {
  return (
    <>
      <FormControl
        variant="standard"
        sx={{
          minWidth: 100,
          paddingRight: "8px",
          textAlign: "center",
        }}
      >
        <InputLabel id="reminder-label">E-mail reminder</InputLabel>
        <Select
          labelId="reminder-label"
          id="reminder"
          value={reminderTime}
          onChange={onChangeReminderTime}
          label="reminder"
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={60}>60</MenuItem>
        </Select>
      </FormControl>
      <Typography>minutes before</Typography>
    </>
  );
};
export default RemindSelector;
