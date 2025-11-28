import React, { useState, useEffect } from "react";
import { Stack, Grid, Card, Button, Box, Modal } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";

export function CustomerAccounts({ accountType }) {
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const baseUrl = 'https://bank-uml.onrender.com';
        const fetchCustomers = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${baseUrl}/customers`);
                if (!res.ok) throw new Error(`Failed to fetch customers: ${res.status}`);
                const data = await res.json();
                setCustomers(data);
            } catch (err) {
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const handleFreezeToggle = async (customerId, freezeStatus) => {
        try {
            const baseUrl = 'https://bank-uml.onrender.com';
            const res = await fetch(`${baseUrl}/user/${customerId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ frozen: freezeStatus })
            });
            if (!res.ok) throw new Error('Failed to update freeze status');
            // Refresh customers list
            const fetchCustomers = async () => {
                try {
                    setLoading(true);
                    const res = await fetch(`${baseUrl}/customers`);
                    if (!res.ok) throw new Error(`Failed to fetch customers: ${res.status}`);
                    const data = await res.json();
                    setCustomers(data);
                } catch (err) {
                    setError(err.message || 'Unknown error');
                } finally {
                    setLoading(false);
                }
            };
            await fetchCustomers();
        } catch (err) {
            alert(err.message || 'Unknown error');
        }
    };

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
                {loading && <p>Loading customers...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && customers.map((field, idx) => {
                    const fullName = `${field.first_name || ''} ${field.last_name || ''}`.trim();
                    const address = `${field.country || ''} ${field.province || ''}, ${field.city || ''} ${field.street || ''} ${field.postal_code || ''}`.replace(/ +/g, ' ').trim();
                    const displayField = {
                        ...field,
                        labelName: "Full Name: ",
                        valueName: fullName,
                        labelEmail: "Email: ",
                        valueEmail: field.email || '',
                        labelDate: "Date of Birth: ",
                        valueDate: field.date_of_birth || '',
                        labelAddress: "Address: ",
                        valueAddress: address,
                    };
                    console.log("field>>> ", field);
                    return (
                        <Card key={field.customer_id || idx} sx={{ width: "100%", marginBottom: "2em" }}>
                            <Grid container>
                                <Grid size={{ xs: 6, sm: 6 }} sx={{ paddingLeft: "1em" }}>
                                    <h4 style={{ textAlign: "start" }}>{displayField.labelName + displayField.valueName}</h4>
                                    <h5 style={{ textAlign: "start" }}>{displayField.labelEmail + displayField.valueEmail}</h5>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 6 }} sx={{ justifyContent: "center", alignItems: "end", display: "flex", flexDirection: "column", paddingRight: "1em" }}>
                                    <Button endIcon={<ArrowForwardIosIcon />}
                                        onClick={() => handleOpen(displayField)}
                                    >View Details
                                    </Button>
                                    {accountType === 'manager' && (
                                        <Button
                                            variant="contained"
                                            color={field.frozen ? 'warning' : 'error'}
                                            sx={{ mt: 1 }}
                                            onClick={() => handleFreezeToggle(field.customer_id, field.frozen ? 0 : 1)}
                                        >
                                            {field.frozen ? 'Unfreeze' : 'Freeze'}
                                        </Button>
                                    )}
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
                            title="Customer Account"
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
