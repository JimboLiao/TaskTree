import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/logo-1.png";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import MemberBtn from "./MemberBtn";
import LoginButton from "./LoginButton";

const AppHeader: React.FC = () => {
  let navigate = useNavigate();
  const { user } = useUserContext();
  function handleClickLogo(): void {
    navigate("/");
  }

  const headerButton = user !== undefined ? <MemberBtn /> : <LoginButton />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#fff",
          color: "#004038",
          borderBottom: 5,
          borderColor: "#004038",
          boxShadow: 0,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 2, padding: 1 }}
            onClick={handleClickLogo}
          >
            <img src={logo} alt="Logo" height="40" />
          </IconButton>
          <Box style={{ flexGrow: 1 }}></Box>
          {headerButton}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
