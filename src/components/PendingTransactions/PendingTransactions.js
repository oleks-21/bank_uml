import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button, Box, Modal } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";

export function PendingTransactions({ accountType }) {
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const baseUrl = "https://bank-uml.onrender.com";
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${baseUrl}/pending-transactions`);
                if (!res.ok) throw new Error(`Failed to fetch transactions: ${res.status}`);
                const data = await res.json();
                setTransactions(data);
            } catch (err) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
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
                {loading && <p>Loading pending transactions...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && transactions.map((field, idx) => {
                    // Map database row fields to UI-friendly values
                    const displayField = {
                        ...field,
                        labelName: "Full Name: ",
                        valueName: field.full_name || field.name || '',
                        labelCard: "Card Number: ",
                        valueCard: field.card_number || field.account_number || '',
                        labelTransaction: "Transaction Amount: ",
                        valueTransaction: field.amount ? `${field.amount}$` : '',
                        labelEmail: "Email: ",
                        valueEmail: field.email || '',
                        labelDate: "Date of Birth: ",
                        valueDate: field.date_of_birth || '',
                        labelAddress: "Address: ",
                        value: field.address || '',
                    };
                    return (
                        <Card key={field.transaction_id || idx} sx={{ width: "100%", marginBottom: "2em" }}>
                            <Grid container>
                                <Grid size={{ xs: 6, sm: 6 }} sx={{ paddingLeft: "1em" }}>
                                    <h4 style={{ textAlign: "start" }}>{displayField.labelCard + displayField.valueCard}</h4>
                                    <h5 style={{ textAlign: "start" }}>{displayField.labelTransaction + displayField.valueTransaction}</h5>
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
                            title="Pending Transaction"
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
