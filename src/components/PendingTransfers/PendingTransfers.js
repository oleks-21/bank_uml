import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button, Box, Modal } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";

export function PendingTransfers({ accountType }) {
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const baseUrl = "https://bank-uml.onrender.com";
        const fetchTransfers = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${baseUrl}/pending-transfers`);
                if (!res.ok) throw new Error(`Failed to fetch transfers: ${res.status}`);
                const data = await res.json();
                setTransfers(data);
            } catch (err) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        fetchTransfers();
    }, []);

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
                {loading && <p>Loading pending transfers...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && transfers.map((field, idx) => {
                    const displayField = {
                        ...field,
                        labelFrom: "From Account: ",
                        valueFrom: field.from_account || '',
                        labelTo: "To Account: ",
                        valueTo: field.to_account || '',
                        labelAmount: "Amount: ",
                        valueAmount: field.amount ? `${field.amount}$` : '',
                        labelStatus: "Status: ",
                        valueStatus: field.status || '',
                    };
                    return (
                        <Card key={field.transfer_id || idx} sx={{ width: "100%", marginBottom: "2em" }}>
                            <Grid container>
                                <Grid size={{ xs: 6, sm: 6 }} sx={{ paddingLeft: "1em" }}>
                                    <h4 style={{ textAlign: "start" }}>{displayField.labelFrom + displayField.valueFrom}</h4>
                                    <h5 style={{ textAlign: "start" }}>{displayField.labelTo + displayField.valueTo}</h5>
                                    <h5 style={{ textAlign: "start" }}>{displayField.labelAmount + displayField.valueAmount}</h5>
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
                            title="Pending Transfer"
                            accountType={accountType}
                            field={selectedField}
                            onClose={handleClose}
                        />
                    )}
                </Box>
            </Modal>
        </>
    );
}
