import { styled } from "@mui/material";
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
  zIndex: 1300,
});

const StyledModalBody = styled("div")({
  backgroundColor: "#FFFFFF",
  borderRadius: "15px",
  maxHeight: "90vh",
  overflow: "auto",
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
        {children}
      </StyledModalBody>
    </StyledOverlay>
  );
};

export default Modal;
