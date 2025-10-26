import React from "react";
import { Stack, Grid, Card, Button, TextField, Typography } from "@mui/material";

export function Profile({ accountType }) {
    console.log(accountType);
    let fields = [];
    switch (accountType) {
        case "user":
            fields = [
                { label: "First Name", value: "John" },
                { label: "Last Name", value: "Doe" },
                { label: "Email", value: "john.doe@gmail.com" },
                { label: "Date of Birth", value: "1994-03-14" },
                { label: "Country", value: "Canada" },
                { label: "Province", value: "Ontario" },
                { label: "City", value: "Toronto" },
                { label: "Address", value: "290 Bremner Boulevard M5V 3L9" },
            ];
            break;
        case "teller":
            fields = [
                { label: "First Name", value: "Teller" },
                { label: "Last Name", value: "Doe" },
                { label: "Email", value: "teller.doe@gmail.com" },
                { label: "Date of Birth", value: "1992-06-02" },
                { label: "Country", value: "Canada" },
                { label: "Province", value: "Ontario" },
                { label: "City", value: "Hamilton" },
                { label: "Address", value: "292 Bremner Boulevard M5V 3L9" },
            ];
            break;
        case "auditor":
            fields = [
                { label: "First Name", value: "Auditor" },
                { label: "Last Name", value: "Doe" },
                { label: "Email", value: "auditor.doe@gmail.com" },
                { label: "Date of Birth", value: "1990-02-11" },
                { label: "Country", value: "Canada" },
                { label: "Province", value: "Ontario" },
                { label: "City", value: "Kingston" },
                { label: "Address", value: "190 Bremner Boulevard M5V 3L9" },
            ];
            break;
        case "manager":
            fields = [
                { label: "First Name", value: "Manager" },
                { label: "Last Name", value: "Doe" },
                { label: "Email", value: "manager.doe@gmail.com" },
                { label: "Date of Birth", value: "1980-01-14" },
                { label: "Country", value: "Canada" },
                { label: "Province", value: "Ontario" },
                { label: "City", value: "Kitchner" },
                { label: "Address", value: "300 Bremner Boulevard M5V 3L9" },
            ];
            break;
        case "user":
        default:
            fields = [
                { label: "First Name", value: "John" },
                { label: "Last Name", value: "Doe" },
                { label: "Email", value: "john.doe@gmail.com" },
                { label: "Date of Birth", value: "1994-03-14" },
                { label: "Country", value: "Canada" },
                { label: "Province", value: "Ontario" },
                { label: "City", value: "Toronto" },
                { label: "Address", value: "290 Bremner Boulevard M5V 3L9" },
            ];
            break;
    }

    return (
        <Card sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
            <Stack spacing={2}>
                {fields.map((field) => (
                    <Grid key={field.label} container alignItems="center" spacing={2}>
                        <Grid item xs={4} width= "100px">
                            <Typography
                                variant="p"
                                sx={{ float: "left"}}
                            >
                                {field.label}:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                defaultValue={field.value}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    </Grid>
                ))}

                <Grid container justifyContent="flex-start">
                    <Button variant="contained" color="success">
                        Save Changes
                    </Button>
                </Grid>
            </Stack>
        </Card>
    );
}
