import { Button } from "@mui/material";
import WorkspaceTitle from "./WorkspaceTitle";

interface DayViewTitleProps {
  onToday: () => void;
}

const DayViewTitle: React.FC<DayViewTitleProps> = ({ onToday }) => {
  return (
    <WorkspaceTitle title="Day View">
      <Button
        variant="outlined"
        sx={{
          padding: 0,
          border: "1px solid #A5A5A5",
          color: "#004038",
          height: "40px",
        }}
        onClick={onToday}
      >
        Today
      </Button>
    </WorkspaceTitle>
  );
};

export default DayViewTitle;
