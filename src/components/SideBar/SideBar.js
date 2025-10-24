import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

export function SideBar({ accountType }) {
  const isStaff = accountType === "staff";

  const menuItems = isStaff
    ? ["My Profile", "Customer Accounts", "Pending Transactions"]
    : ["My Profile", "Accounts", "Transaction History"];

  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "70vh",
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ marginBottom: 2, fontWeight: "bold" }}
      >
        {isStaff ? "Staff Menu" : "Customer Menu"}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
