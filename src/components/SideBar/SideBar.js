import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

export function SideBar({ accountType, onMenuSelect, selectedMenuItem }) {
  let menuItems = [];

  switch (accountType) {
    case "teller":
      menuItems = ["My Profile", "Customer Accounts", "Pending Transactions", "Pending Transfers"];
      break;
    case "auditor":
      menuItems = ["My Profile", "Customer Accounts", "Compliance Logs"];
      break;
    case "manager":
      menuItems = [
        "My Profile",
        "Customer Accounts",
        "Pending Transactions",
        "Pending Transfers",
        "Manage Staff",
      ];
      break;
    case "user":
    default:
      menuItems = ["My Profile", "Accounts", "Transaction History", "Transfer History", "Make a Transfer"];
      break;
  }
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: "70vh",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ marginBottom: 2, fontWeight: "bold" }}
      >
        {accountType.charAt(0).toUpperCase() + accountType.slice(1) + " Options"}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              selected={selectedMenuItem === item}
              onClick={() => onMenuSelect(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
