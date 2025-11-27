import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../store/userSlice";
import Button from "@mui/material/Button";


export function TopBar() {
  const navigate = useNavigate();
  const { user, accountType } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");

      setTimeout(() => {
        alert("Successfully logged out");
      }, 100);

  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#1976d2",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
    
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT: Home Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </IconButton>

        {/* CENTER: Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          BankUML
        </Typography>

        {/* RIGHT: User Info + Logout */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user && (
            <>
              <Typography variant="body1">
                {user.first_name} {user.last_name}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleLogout}
                sx={{ fontWeight: "bold" }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>);
}
