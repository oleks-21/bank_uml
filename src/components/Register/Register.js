import React, { useState } from "react";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from 'react-router-dom';
import { Box } from "@mui/material";
import dayjs from "dayjs";
import "./Register.css";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignSelf: "center",
  width: "100%",
  height: "25em",
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

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // 🧩 Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: null,
    country: "",
    province: "",
    city: "",
    street: "",
    postal_code: "",
    document_1: "",
    document_2: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  // ✅ Registration handler
  const handleRegister = async () => {
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("https://bankuml-backend.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date_of_birth: formData.date_of_birth
            ? dayjs(formData.date_of_birth).format("YYYY-MM-DD")
            : null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(`✅ Registration successful! Your card number: ${data.card_number}`);
        navigate("/account", {
          state: { accountType: "user", user: { customer_id: data.customer_id } },
        });
      } else {
        alert("❌ Registration failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <Card id="register-card">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: "1rem",
          }}
        >
          <h3 style={{ alignSelf: "center" }}>Create an Account</h3>

          {step === 1 && (
            <>
              <TextField
                fullWidth
                size="small"
                label="First Name"
                value={formData.first_name}
                onChange={handleChange("first_name")}
              />
              <TextField
                fullWidth
                size="small"
                label="Last Name"
                value={formData.last_name}
                onChange={handleChange("last_name")}
              />
              <TextField
                fullWidth
                size="small"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.date_of_birth}
                  onChange={(newValue) =>
                    setFormData({ ...formData, date_of_birth: newValue })
                  }
                  slotProps={{ textField: { size: "small" } }}
                />
              </LocalizationProvider>
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                fullWidth
                size="small"
                label="Country"
                value={formData.country}
                onChange={handleChange("country")}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  sx={{ flex: 1 }}
                  size="small"
                  label="Province"
                  value={formData.province}
                  onChange={handleChange("province")}
                />
                <TextField
                  sx={{ flex: 1 }}
                  size="small"
                  label="City"
                  value={formData.city}
                  onChange={handleChange("city")}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  sx={{ flex: 1 }}
                  size="small"
                  label="Street"
                  value={formData.street}
                  onChange={handleChange("street")}
                />
                <TextField
                  sx={{ flex: 1 }}
                  size="small"
                  label="Postal Code"
                  value={formData.postal_code}
                  onChange={handleChange("postal_code")}
                />
              </Box>

              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  setFormData({ ...formData, document_1: "document1.png" })
                }
              >
                Upload Document #1
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  setFormData({ ...formData, document_2: "document2.png" })
                }
              >
                Upload Document #2
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <TextField
                fullWidth
                size="small"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
              />
              <TextField
                fullWidth
                size="small"
                label="Confirm Password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange("confirm_password")}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
              >
                Register
              </Button>
            </>
          )}
        </div>

        <Stack direction="row" spacing={2} justifyContent="space-between">
          {step > 1 && (
            <Button variant="outlined" onClick={handleBack}>
              Back
            </Button>
          )}
          {step === 1 && <div></div>}
          {step < 3 && (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Stack>
      </Card>
    </div>
  );
}
