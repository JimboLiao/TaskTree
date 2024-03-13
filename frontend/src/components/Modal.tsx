import { Typography, styled } from "@mui/material";
import logo from "../assets/logo-1.png";
const StyledOverlay = styled("div")({
  width: "100%",
  height: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
});

const StyledModalBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "100px",
  backgroundColor: "#FFFFFF",
  borderRadius: "15px",
});

const StyledLogoContainer = styled("div")({
  display: "flex",
  paddingBottom: "20px",
  justifyItems: "flex-start",
  alignItems: "baseline",
  width: "100%",
});

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen }) => {
  if (!isOpen) return null;
  return (
    <StyledOverlay onClick={onClose}>
      <StyledModalBody onClick={(e) => e.stopPropagation()}>
        <StyledLogoContainer>
          <img src={logo} alt="Logo" height="40" />
          <Typography
            variant="h4"
            sx={{ color: "#004038", paddingLeft: "5px" }}
          >
            TaskTree
          </Typography>
        </StyledLogoContainer>
        {children}
      </StyledModalBody>
    </StyledOverlay>
  );
};

export default Modal;
