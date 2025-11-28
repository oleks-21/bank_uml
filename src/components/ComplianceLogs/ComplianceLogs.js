import React, { useState, useEffect } from "react";
import { Stack, Grid, Card, Button, Box, Modal, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";

export function ComplianceLogs({ accountType, searchValue }) {
    const [audits, setAudits] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const baseUrl = 'https://bank-uml.onrender.com';
        const fetchAudits = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${baseUrl}/audits`);
                if (!res.ok) throw new Error(`Failed to fetch audits: ${res.status}`);
                const data = await res.json();
                setAudits(data);
            } catch (err) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        fetchAudits();
    }, []);

    const handleOpen = (field) => {
        setSelectedField(field);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedField(null);
        setOpen(false);
    };

    const filteredLogs = audits.filter((field) => {
        const text = Object.values(field).join(" ").toLowerCase();
        return text.includes(searchValue.toLowerCase());
    });

    return (
        <>
            <Stack>
                {loading && <Typography>Loading compliance logs...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                {!loading && !error && filteredLogs.map((field, idx) => (
                    <Card key={field.audit_id || idx} sx={{ width: "100%", mb: 2 }}>
                        <Grid container>
                            <Grid size={{ xs: 6, sm: 6 }} sx={{ paddingLeft: "1em" }}>
                                <h4 style={{ textAlign: "start" }}>
                                    {field.type_of_transaction?.toUpperCase()} | {field.status?.toUpperCase()} | {new Date(field.date_of_transaction).toLocaleString()}
                                </h4>
                                <h5 style={{ textAlign: "start" }}>
                                    Amount: ${field.amount}
                                </h5>
                                <h5 style={{ textAlign: "start" }}>
                                    Primary Card: {field.primary_card}
                                </h5>
                                {field.secondary_card && (
                                    <h5 style={{ textAlign: "start" }}>
                                        Secondary Card: {field.secondary_card}
                                    </h5>
                                )}
                            </Grid>
                            <Grid xs={6} size={{ xs: 6, sm: 6 }} sx={{ justifyContent: "center", alignItems: "end", display: "flex", flexDirection: "column", paddingRight: "1em" }}
                            >
                                <Button
                                    endIcon={<ArrowForwardIosIcon />}
                                    onClick={() => handleOpen(field)}
                                >
                                    View Details
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                ))}
                {!loading && !error && filteredLogs.length === 0 && (
                    <Typography sx={{ textAlign: "center", opacity: 0.6 }}>No compliance logs found.</Typography>
                )}
            </Stack>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    {selectedField && (
                        <DetailsOverlay
                            title="Audit Details"
                            field={selectedField}
                            onClose={handleClose}
                            accountType={accountType}
                            editable={false}
                        />
                    )}
                </Box>
            </Modal>
        </>
    );
}