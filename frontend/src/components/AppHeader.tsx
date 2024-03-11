import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import logo from "../assets/logo-1.png";
import { useNavigate } from "react-router-dom";

const AppHeader: React.FC = () => {
  let navigate = useNavigate();
  function handleClickLogo(): void {
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
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
            sx={{ mr: 2 }}
            onClick={handleClickLogo}
          >
            <img src={logo} alt="Logo" height="50" />
          </IconButton>
          <Box style={{ flexGrow: 1 }}></Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
