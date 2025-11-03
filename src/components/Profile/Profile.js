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
        } else if (user?.worker_id) {
            fetch(`https://bank-uml.onrender.com/worker/${user.worker_id}`)
                .then((res) => res.json())
                .then((data) => setUserData(data))
                .catch((err) => console.error("Failed to fetch worker profile:", err));
        }
    }, [accountType, user]);

    if (!userData) {
        return <Typography>Loading profile...</Typography>;
    }

    const fields = [
        { label: "First Name", value: userData.first_name },
        { label: "Last Name", value: userData.last_name },
        { label: "Email", value: userData.email },
        ...(accountType !== "user"
            ? [{ label: "Role", value: userData.role }]
            : []),
        { label: "Date of Birth", value: userData.date_of_birth },
        { label: "Country", value: userData.country },
        { label: "Province", value: userData.province },
        { label: "City", value: userData.city },
        { label: "Address", value: `${userData.street} ${userData.postal_code}` },
    ];

    return (
        <Card sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
            <Stack spacing={2}>
                {fields.map((field) => (
                    <Grid key={field.label} container alignItems="center" spacing={2}>
                        <Grid item xs={4} width="100px">
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
