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
    const [actionLoading, setActionLoading] = useState(false);

    const baseUrl = "https://bank-uml.onrender.com";

    const fetchTransfers = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${baseUrl}/pending-transfers`);
            if (!res.ok) throw new Error(`Failed to fetch transfers: ${res.status}`);
            const data = await res.json();
            setTransfers(data);
        } catch (err) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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

    // ---------------------------------------------------
    // 🔥 Accept or Reject Transfer
    // ---------------------------------------------------
    const handleAction = async (transferId, action) => {
        try {
            setActionLoading(true);

            const res = await fetch(`${baseUrl}/transfer-action/${transferId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action })
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(`Server error: ${msg}`);
            }

            // Refresh the transfer list
            await fetchTransfers();
            handleClose();
        } catch (err) {
            alert(err.message);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <>
            <Stack>
                {loading && <p>Loading pending transfers...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && transfers.map((field, idx) => {
                    const displayField = { ...field };

                    return (
                        <Card key={field.transfer_id || idx} sx={{ width: "100%", marginBottom: "2em" }}>
                            <Grid container>
                                <Grid size={{ xs: 6, sm: 6 }} sx={{ paddingLeft: "1em" }}>
                                    <h4 style={{ textAlign: "start" }}>
                                        {"From Account: " + (field.card_number_from || "")}
                                    </h4>
                                    <h5 style={{ textAlign: "start" }}>
                                        {"To Account: " + (field.card_number_to || "")}
                                    </h5>
                                    <h5 style={{ textAlign: "start" }}>
                                        {"Amount: " + (field.amount ? `${field.amount}$` : "")}
                                    </h5>
                                </Grid>

                                <Grid
                                    size={{ xs: 6, sm: 6 }}
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "end",
                                        display: "flex",
                                        flexDirection: "column",
                                        paddingRight: "1em"
                                    }}
                                >
                                    <Button
                                        endIcon={<ArrowForwardIosIcon />}
                                        onClick={() => handleOpen(displayField)}
                                    >
                                        View Details
                                    </Button>
                                </Grid>
                            </Grid>
                        </Card>
                    );
                })}
            </Stack>

            {/* ----------------- Modal ----------------- */}
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
                        p: 4,
                    }}
                >
                    {selectedField && (
                        <>
                            <DetailsOverlay
                                title="Pending Transfer"
                                accountType={accountType}
                                field={selectedField}
                                onClose={handleClose}
                                editable={false}
                            />

                            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    disabled={actionLoading}
                                    onClick={() =>
                                        handleAction(selectedField.transfer_id, "accept")
                                    }
                                >
                                    {actionLoading ? "Processing..." : "Accept"}
                                </Button>

                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    disabled={actionLoading}
                                    onClick={() =>
                                        handleAction(selectedField.transfer_id, "reject")
                                    }
                                >
                                    {actionLoading ? "Processing..." : "Reject"}
                                </Button>
                            </Stack>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
}
