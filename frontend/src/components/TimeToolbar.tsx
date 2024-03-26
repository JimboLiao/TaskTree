import { IconButton, Typography, styled } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "20px",
  paddingBottom: "10px",
});

interface TimeToolbarProps {
  title: string;
  onNext: () => void;
  onPrev: () => void;
}
const TimeToolbar: React.FC<TimeToolbarProps> = ({ title, onNext, onPrev }) => {
  return (
    <StyledContainer>
      <IconButton onClick={onPrev}>
        <NavigateBeforeIcon />
      </IconButton>
      <Typography fontSize="36px" color="#004038" textAlign="center">
        {title}
      </Typography>
      <IconButton onClick={onNext}>
        <NavigateNextIcon />
      </IconButton>
    </StyledContainer>
  );
};

export default TimeToolbar;
