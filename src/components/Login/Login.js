import React, { useState } from "react";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  "&.MuiAccordion-root:before": {
    display: "none",
  },
}));

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [customerCard, setCustomerCard] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [staffUsername, setStaffUsername] = useState("");
  const [staffPassword, setStaffPassword] = useState("");

  const customerCredentials = {
    cardNumber: "123",
    password: "123",
  };

  const staffCredentials = {
    teller: "123",
    auditor: "123",
    manager: "123",
  };

  const handleCustomerLogin = async () => {
    try {
      const response = await fetch("https://bank-uml.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber: customerCard,
          password: customerPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        dispatch(setUser({ user: data.user, accountType: "user" }));
        navigate("/account", { state: { accountType: "user", user: data.user } });
      } else {
        alert(data.message || "Invalid card number or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    }
  };

  const handleStaffLogin = async () => {
    try {
      const response = await fetch("https://bank-uml.onrender.com/login-worker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: staffUsername,
          password: staffPassword,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        dispatch(setUser({ user: data.user, accountType: data.user.role }));

        navigate("/account", { state: { accountType: data.user.role, user: data.user } });
      } else {
        alert(data.message || "Invalid staff email or password.");
      }
    } catch (error) {
      console.error("Staff login error:", error);
      alert("Server error. Please try again later.");
    }
  };


  return (
    <div>
      <Card id="login-card">
        <h3 style={{ marginLeft: "0.5em" }}>Customer Login</h3>

        <TextField
          id="customer-username-input"
          label="Card Number"
          type="text"
          value={customerCard}
          onChange={(e) => setCustomerCard(e.target.value)}
          autoComplete="off"
        />
        <TextField
          id="customer-password-input"
          label="Password"
          type="password"
          value={customerPassword}
          onChange={(e) => setCustomerPassword(e.target.value)}
          autoComplete="off"
        />

        <Button variant="contained" onClick={handleCustomerLogin}>
          Login
        </Button>

        <Link href="register" underline="none" style={{ marginLeft: "1em" }}>
          {"Don't have an account?"}
        </Link>

        <Divider sx={{ my: 2 }} />

        <StyledAccordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              Staff & Administration Login
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              id="staff-username-input"
              label="Username"
              type="text"
              value={staffUsername}
              onChange={(e) => setStaffUsername(e.target.value)}
              sx={{ width: "100%" }}
            />
            <TextField
              id="staff-password-input"
              label="Password"
              type="password"
              value={staffPassword}
              onChange={(e) => setStaffPassword(e.target.value)}
              sx={{ width: "100%", marginTop: "1em" }}
            />
            <Button
              variant="contained"
              sx={{ width: "100%", marginTop: "1em" }}
              onClick={handleStaffLogin}
            >
              Login
            </Button>
          </AccordionDetails>
        </StyledAccordion>
      </Card>
    </div>
  );
}
