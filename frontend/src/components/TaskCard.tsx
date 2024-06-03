import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Dayjs } from "dayjs";

interface TaskCardProps {
  title: string;
  start: Dayjs;
  end: Dayjs;
  description: string;
  statusColor: string;
  importanceColor: string;
  categoryColor: string;
  isAllDay: boolean;
  onTaskCard: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  start,
  end,
  description,
  statusColor,
  importanceColor,
  categoryColor,
  isAllDay,
  onTaskCard,
}) => {
  const time = isAllDay
    ? start.format("MMM D") // Formats date as 'Month day', e.g., 'Apr 7'
    : `${start.format("h:mm A")} - ${end.format("h:mm A")}`; // Formats time as 'hour:minute AM/PM', e.g., '3:00 PM'

  return (
    <Card
      sx={{
        minWidth: 275,
        margin: 2,
        borderLeft: `5px solid ${categoryColor}`,
      }}
      onClick={onTaskCard}
    >
      <CardActionArea sx={{ height: "100%", minHeight: "125px" }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #A5A5A5"
          >
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Box sx={{ minWidth: "28px" }}>
              <Box
                component="span"
                sx={{
                  width: 10,
                  height: 10,
                  display: "inline-block",
                  borderRadius: "50%",
                  backgroundColor: statusColor,
                  marginRight: 1,
                }}
              />
              <Box
                component="span"
                sx={{
                  width: 10,
                  height: 10,
                  display: "inline-block",
                  borderRadius: "50%",
                  backgroundColor: importanceColor,
                }}
              />
            </Box>
          </Box>
          <Typography sx={{ mb: "8px" }} textAlign="right">
            {time}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TaskCard;
