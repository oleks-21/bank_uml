import React, { useEffect, useState } from "react";
import { Stack, Grid, Card, Button, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export function Profile({ accountType }) {
    const location = useLocation();
    const user = location.state?.user;
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (accountType === "user" && user?.customer_id) {
            fetch(`https://bank-uml.onrender.com/user/${user.customer_id}`)
                .then((res) => res.json())
                .then((data) => setUserData(data))
                .catch((err) => console.error("Failed to fetch user profile:", err));
        }
    }, [accountType, user]);

    if (accountType === "user" && !userData) {
        return <Typography>Loading profile...</Typography>;
    }

    const fields =[];
        switch (accountType) {
        case "user":
            fields = [
                { label: "First Name", value: userData.first_name },
                { label: "Last Name", value: userData.last_name },
                { label: "Email", value: userData.email },
                { label: "Date of Birth", value: userData.date_of_birth },
                { label: "Country", value: userData.country },
                { label: "Province", value: userData.province },
                { label: "City", value: userData.city },
                { label: "Address", value: `${userData.street} ${userData.postal_code}` },
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
                        <Grid item xs={4}>
                            <Typography variant="body1" sx={{ float: "left" }}>
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
