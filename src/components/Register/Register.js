import React from "react";
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";
const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export function Register() {
    return (
        <div>
            <Card id="login-card">
                <h3 style={{ alignSelf: "center" }}>Create an Account</h3>
                <TextField
                    id="customer-firstname-input"
                    label="First Name"
                    type="firstname"
                />
                <TextField
                    id="customer-lastname-input"
                    label="Last Name"
                    type="lastname"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Date of Birth" />
                </LocalizationProvider>
                <TextField
                    id="customer-country-input"
                    label="Country"
                    type="country"
                />
                <TextField
                    id="customer-province-input"
                    label="Province"
                    type="province"
                />
                <TextField
                    id="customer-city-input"
                    label="City"
                    type="city"
                />
                <TextField
                    id="customer-street-input"
                    label="Street"
                    type="steet"
                />
                <TextField
                    id="customer-postalcode-input"
                    label="Postal Code"
                    type="postal code"
                />
                <Button variant="outlined" color="primary"> Upload Document #1</Button>
                <Button variant="outlined" color="primary"> Upload Document #2</Button>
                <TextField
                    id="customer-password-input"
                    label="Password"
                    type="password"
                />
                <TextField
                    id="customer-password-input-2"
                    label="Confirm Password"
                    type="password2"
                />
                <Button variant="contained">Register</Button>
            </Card>
        </div>
    );
}