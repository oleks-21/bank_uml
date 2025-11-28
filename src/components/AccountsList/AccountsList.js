import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button, Typography, Modal, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";
import { useSelector } from "react-redux";
export function AccountsList({ accountType, searchValue }) {
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useSelector((state) => state.user);  // get logged-in user

    useEffect(() => {
        const baseUrl = 'https://bank-uml.onrender.com';
        const fetchAccounts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${baseUrl}/accounts/${user.customer_id}`);
                if (!res.ok) throw new Error(`Failed to fetch accounts: ${res.status}`);
                const data = await res.json();
                setAccounts(data);
            } catch (err) {
                console.error(err);
                setError(err.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    const filteredAccounts = accounts.filter((field) => {
        const text = Object.values(field).join(" ").toLowerCase();
        return text.includes(searchValue.toLowerCase());
    });

    const handleOpen = (field) => {
        setSelectedField(field);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedField(null);
    };

    return (
        <>
            <Stack>
                {loading && <Typography>Loading accounts...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                {!loading && !error && filteredAccounts.map((field, idx) => {
                    const cardNumber = field.primary_card_number || field.card_number || field.account_number || 'N/A';
                    const type = field.account_type || field.type || field.accountType || 'N/A';
                    const amount = (field.balance !== undefined && field.balance !== null) ? `${field.balance}$` : (field.amount ? `${field.amount}$` : '0.00$');
                    const date = field.last_payment_date || field.date || field.updated_at || '';

                    const displayField = {
                        ...field,
                    };

                    return (
                        <Card key={`${cardNumber}-${idx}`} sx={{ width: "100%", marginBottom: "2em" }}>
                            <Grid container>
                                <Grid size={{ xs: 6, sm: 6 }} sx={{ paddingLeft: "1em" }}>
                                    <h4 style={{ textAlign: "start" }}>{'Card Number: ' + cardNumber}</h4>
                                    <h5 style={{ textAlign: "start" }}>{type}</h5>
                                    <p style={{ textAlign: "start" }}>{'Amount Paid: ' + amount}</p>
                                </Grid>
                                <Grid size={{ xs: 6, sm: 6 }} sx={{ justifyContent: "center", alignItems: "end", display: "flex", flexDirection: "column", paddingRight: "1em" }}>
                                    <Button onClick={() => handleOpen(displayField)}
                                        endIcon={<ArrowForwardIosIcon />}>View Details
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
                            title="Account Details"
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