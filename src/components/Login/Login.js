import React from "react";
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "@mui/material/Link";
import { useNavigate } from 'react-router-dom';

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
const StyledAccordion = styled(Accordion)(({ theme }) => ({
    boxShadow: 'none',
    '&.MuiAccordion-root:before': {
        display: 'none',
    },
}));
export function Login() {
    const navigate = useNavigate();
    return (
        <div>
            <Card id="login-card">
                <h3 style={{ marginLeft: "0.5em" }}>Customer Login</h3>
                <TextField
                    id="customer-username-input"
                    label="Card Number"
                    type="username"
                    autoComplete="current-username"
                />
                <TextField
                    id="customer-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                <Button variant="contained" onClick={() => navigate('/account', { state: { accountType: 'user' } })}>Login</Button>
                <Link href="register" underline="none" style={{ marginLeft: "1em" }}>
                    {"Don't have an account?"}
                </Link>
                <Divider></Divider>
                <StyledAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span" sx={{ fontWeight: "bold" }}>Staff & Administration Login</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            id="staff-username-input"
                            label="Username"
                            type="username"
                            autoComplete="current-username"
                            sx={{ width: "100%" }}
                        />
                        <TextField
                            id="staff-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            sx={{ width: "100%", marginTop: "1em" }}
                        />
                        <Button variant="contained" sx={{ width: "100%", marginTop: "1em" }} onClick={() => navigate('/account', { state: { accountType: 'staff' } })}>Login</Button>
                    </AccordionDetails>
                </StyledAccordion>

            </Card>
        </div>
    );
}