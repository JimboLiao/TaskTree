import { Typography, styled } from "@mui/material";

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "10px",
});

interface WorkspaceTitleProps {
  title: string;
  children?: React.ReactNode;
}

const WorkspaceTitle: React.FC<WorkspaceTitleProps> = ({ title, children }) => {
  return (
    <StyledContainer>
      <Typography fontSize="36px" color="#004038" textAlign="center">
        {title}
      </Typography>
      {children ? children : null}
    </StyledContainer>
  );
};

export default WorkspaceTitle;
