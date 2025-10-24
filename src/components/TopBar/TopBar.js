import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export function TopBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#1976d2", // MUI primary blue
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between"}}>
        {/* Left: Home Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </IconButton>

        {/* Center: BankUML title */}
        <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", letterSpacing: 1 }}
          >
            BankUML
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
