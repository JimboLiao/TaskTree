import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/logo-1.png";
import { useNavigate } from "react-router-dom";

interface AppHeaderProps {
  onLogin: () => void;
  isLoggedIn: boolean;
}
const AppHeader: React.FC<AppHeaderProps> = ({
  isLoggedIn = false,
  onLogin,
}) => {
  let navigate = useNavigate();
  function handleClickLogo(): void {
    navigate("/");
  }

  const headerButton = isLoggedIn ? (
    <Button
      color="inherit"
      onClick={
        //@todo handle member btn
        () => console.log("member")
      }
    >
      Member
    </Button>
  ) : (
    <Button color="inherit" onClick={onLogin}>
      Login
    </Button>
  );

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
