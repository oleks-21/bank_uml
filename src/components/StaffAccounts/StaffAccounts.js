import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button, Box, Modal } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";

export function StaffAcounts({ accountType, searchValue }) {
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const baseUrl = 'https://bank-uml.onrender.com';
        const fetchWorkers = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${baseUrl}/workers`);
                if (!res.ok) throw new Error(`Failed to fetch workers: ${res.status}`);
                const data = await res.json();
                setWorkers(data);
            } catch (err) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        fetchWorkers();
    }, []);

    const filteredWorkers = workers.filter((field) => {
        const text = Object.values(field).join(" ").toLowerCase();
        return text.includes(searchValue.toLowerCase());
    });

    const handleOpen = (field) => {
        setSelectedField(field);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedField(null);
        setOpen(false);
    };
    return (
        <>
            <Stack>
                {loading && <p>Loading staff...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && filteredWorkers.map((field, idx) => {
                    const fullName = `${field.first_name || ''} ${field.last_name || ''}`.trim();
                    const address = `${field.country || ''} ${field.province || ''}, ${field.city || ''} ${field.street || ''} ${field.postal_code || ''}`.replace(/ +/g, ' ').trim();
                    const displayField = {
                        ...field,
                        // labelName: "Full Name: ",
                        // valueName: fullName,
                        // labelEmail: "Email: ",
                        // valueEmail: field.email || '',
                        // labelDate: "Date of Birth: ",
                        // valueDate: field.date_of_birth || '',
                        // labelAddress: "Address: ",
                        // valueAddress: address,
                        // labelRole: "Role: ",
                        // valueRole: field.role || '',
                    };
                    return (
                        <Card key={field.worker_id || idx} sx={{ width: "100%", marginBottom: "2em" }}>
                            <Grid container>
                                <Grid size={{ xs: 6, sm: 6 }} sx={{ paddingLeft: "1em" }}>
                                    <h4 style={{ textAlign: "start" }}>{"Full Name: " + fullName}</h4>
                                    <h5 style={{ textAlign: "start" }}>{"Email: " + (field.email || '')}</h5>
                                    <h5 style={{ textAlign: "start" }}>{"Role: " + (field.role || '')}</h5>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 6 }} sx={{ justifyContent: "center", alignItems: "end", display: "flex", flexDirection: "column", paddingRight: "1em" }}>
                                    <Button endIcon={<ArrowForwardIosIcon />}
                                        onClick={() => handleOpen(displayField)}>View Details
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    );
                })}
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
                            title="Staff Account"
                            accountType={accountType}
                            field={selectedField}
                            onClose={handleClose}
                            editable={true}
                        />
                    )}
                </Box>
            </Modal>
        </>
    );
}
