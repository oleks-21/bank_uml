import React, { useEffect, useState } from "react";
import { Stack, Grid, Card, Button, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export function Profile({ accountType }) {
    const location = useLocation();
    const user = location.state?.user;
    const [userData, setUserData] = useState(null);
    const [editData, setEditData] = useState({});
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        if (accountType === "user" && user?.customer_id) {
            fetch(`https://bank-uml.onrender.com/user/${user.customer_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setUserData(data);
                    setEditData({
                        first_name: data.first_name || "",
                        last_name: data.last_name || "",
                        email: data.email || "",
                        date_of_birth: data.date_of_birth || "",
                        country: data.country || "",
                        province: data.province || "",
                        city: data.city || "",
                        street: data.street || "",
                        postal_code: data.postal_code || "",
                    });
                })
                .catch((err) => console.error("Failed to fetch user profile:", err));
        } else if (user?.worker_id) {
            fetch(`https://bank-uml.onrender.com/worker/${user.worker_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setUserData(data);
                    setEditData({
                        first_name: data.first_name || "",
                        last_name: data.last_name || "",
                        email: data.email || "",
                        date_of_birth: data.date_of_birth || "",
                        country: data.country || "",
                        province: data.province || "",
                        city: data.city || "",
                        street: data.street || "",
                        postal_code: data.postal_code || "",
                    });
                })
                .catch((err) => console.error("Failed to fetch worker profile:", err));
        }
    }, [accountType, user]);

    if (!userData) {
        return <Typography>Loading profile...</Typography>;
    }

    const handleFieldChange = (field) => (e) => {
        setEditData((prev) => ({ ...prev, [field]: e.target.value }));
        setSaveSuccess(false);
        setSaveError(null);
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveError(null);
        setSaveSuccess(false);
        try {
            let url, method = "PATCH";
            if (accountType === "user" && user?.customer_id) {
                url = `https://bank-uml.onrender.com/user/${user.customer_id}`;
            } else if (user?.worker_id) {
                url = `https://bank-uml.onrender.com/worker/${user.worker_id}`;
            }
            if (!url) throw new Error("No valid user or worker id");
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData),
            });
            if (!res.ok) throw new Error("Failed to save changes");
            setSaveSuccess(true);
        } catch (err) {
            setSaveError(err.message || "Unknown error");
        } finally {
            setSaving(false);
        }
    };

    const fields = [
        { label: "First Name", value: editData.first_name, field: "first_name" },
        { label: "Last Name", value: editData.last_name, field: "last_name" },
        { label: "Email", value: editData.email, field: "email" },
        ...(accountType !== "user"
            ? [{ label: "Role", value: userData.role, field: "role", disabled: true }]
            : []),
        { label: "Date of Birth", value: editData.date_of_birth, field: "date_of_birth" },
        { label: "Country", value: editData.country, field: "country" },
        { label: "Province", value: editData.province, field: "province" },
        { label: "City", value: editData.city, field: "city" },
        { label: "Address", value: `${editData.street} ${editData.postal_code}`, field: "address" },
    ];

    return (
        <Card sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
            <Stack spacing={2}>
                {fields.map((field) => (
                    <Grid key={field.label} container alignItems="center" spacing={2}>
                        <Grid item size={{ xs: 3, sm: 3 }} sx={{ paddingLeft: "1em" }}>
                            <Typography variant="body1" sx={{ float: "left" }}>
                                {field.label}:
                            </Typography>
                        </Grid>
                        <Grid item xs={6} size={{ xs: 9, sm: 9 }} sx={{ justifyContent: "center", alignItems: "end", display: "flex", flexDirection: "column", paddingRight: "1em" }}>
                            <TextField
                                fullWidth
                                value={field.value}
                                variant="outlined"
                                size="small"
                                onChange={field.disabled ? undefined : handleFieldChange(field.field)}
                                disabled={field.disabled}
                            />
                        </Grid>
                    </Grid>
                ))}
                {saveError && <Typography color="error">{saveError}</Typography>}
                {saveSuccess && <Typography color="success.main">Saved!</Typography>}
                <Grid container justifyContent="flex-start">
                    <Button variant="contained" color="success" onClick={handleSave} disabled={saving} fullWidth>
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </Grid>
            </Stack>
        </Card>
    );
}
