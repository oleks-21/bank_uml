import React, { useState } from "react";
import { Stack, Card, Typography, Button, Divider, Grid, TextField } from "@mui/material";

function formatLabel(label) {
    return label
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();
}

export function DetailsOverlay({ title, field, onClose, accountType, editable }) {
    // Move hooks before any return
    const isEditable = (accountType === "teller" || accountType === "manager") && editable;
    const [editData, setEditData] = useState(field || {});
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    if (!field) return null;

    const handleFieldChange = (key) => (e) => {
        setEditData((prev) => ({ ...prev, [key]: e.target.value }));
        setSaveSuccess(false);
        setSaveError(null);
    };

    // Determine endpoint and id for PATCH/PUT
    const getEndpoint = () => {
        if (editData.customer_id) return [`/user/${editData.customer_id}`, "PATCH"];
        if (editData.worker_id) return [`/worker/${editData.worker_id}`, "PATCH"];
        if (editData.account_id) return [`/accounts/${editData.account_id}`, "PATCH"];
        if (editData.transaction_id) return [`/transactions/${editData.transaction_id}`, "PATCH"];
        return [null, null];
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveError(null);
        setSaveSuccess(false);
        const [endpoint, method] = getEndpoint();
        if (!endpoint) {
            setSaveError("Unknown data type for saving.");
            setSaving(false);
            return;
        }
        try {
            const baseUrl = 'https://bank-uml.onrender.com';
            const res = await fetch(`${baseUrl}${endpoint}`, {
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

    return (
        <Card sx={{ p: 3, maxHeight: "70vh", overflowY: "auto" }}>
            <Stack spacing={2}>
                <Typography variant="h6" gutterBottom>
                    {title || "Details"}
                </Typography>
                <Divider />
                {Object.entries(editData).map(([key, value]) => (
                    <Grid container alignItems="center" spacing={1} key={key}>
                        <Grid item xs={5}>
                            <Typography fullWidth variant="body2" sx={{ fontWeight: 600, width: "100px" }}>
                                {formatLabel(key)}:
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            {isEditable && typeof value === "string" ? (
                                <TextField
                                    fullWidth
                                    value={value}
                                    size="small"
                                    variant="outlined"
                                    onChange={handleFieldChange(key)}
                                    sx={{ width: "340px" }}
                                />
                            ) : (
                                <Typography variant="body2">{value}</Typography>
                            )}
                        </Grid>
                    </Grid>
                ))}
                {saveError && <Typography color="error">{saveError}</Typography>}
                {saveSuccess && <Typography color="success.main">Saved!</Typography>}
                <Divider sx={{ my: 1 }} />
                {/* <Grid container>
                    <Grid item xs={6}> */}

            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>

                {/* </Grid> */}
                {/* <Grid item xs={6}> */}
                {isEditable ? (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onClose}
                            sx={{ width: "50%" }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSave}
                            sx={{ float: "right", width: "50%" }}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                    </>
                    ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                        sx={{ width: "100%" }}
                    >
                        Close
                    </Button>

                )}
                {/* </Grid> */}
                {/* </Grid> */}
            </Stack>
        </Card>
    );
}
