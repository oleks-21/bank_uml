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
import './Register.css'
const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // ⬅️ Add this line
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

    const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div>
            <Card id="register-card">
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    gap: "1rem",
                }}>
                    <h3 style={{ alignSelf: "center" }}>Create an Account</h3>

                    {step === 1 && (
                        <>
                            <TextField fullWidth size="small" id="customer-firstname-input" label="First Name" />
                            <TextField fullWidth size="small" id="customer-lastname-input" label="Last Name" />
                            <TextField fullWidth size="small" id="customer-email-input" label="Email" type="email" />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Date of Birth" slotProps={{ textField: { size: "small" } }} />
                            </LocalizationProvider>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <TextField fullWidth size="small" id="customer-country-input" label="Country" />
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField sx={{ flex: 1 }} size="small" id="customer-province-input" label="Province" />
                                <TextField sx={{ flex: 1 }} size="small" id="customer-city-input" label="City" />
                            </Box>

                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField sx={{ flex: 1 }} size="small" id="customer-street-input" label="Street" />
                                <TextField sx={{ flex: 1 }} size="small" id="customer-postalcode-input" label="Postal Code" />
                            </Box> 
                           <Button variant="outlined" color="primary">
                                Upload Document #1
                            </Button>
                            <Button variant="outlined" color="primary">
                                Upload Document #2
                            </Button>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <TextField
                                fullWidth
                                size="small"
                                id="customer-password-input"
                                label="Password"
                                type="password"
                            />
                            <TextField
                                fullWidth
                                size="small"
                                id="customer-password-input-2"
                                label="Confirm Password"
                                type="password"
                            />
                            <Button variant="contained" color="primary" onClick={() => navigate('/account', { state: { accountType: 'customer' } })}>
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
                    {step == 1 && (
                        <div></div>
                    )}
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
