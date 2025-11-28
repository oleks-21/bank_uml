import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button, Typography, Modal, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";

export function CardList(accountType, searchValue) {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [open, setOpen] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const baseUrl = 'https://bank-uml.onrender.com';
        const fetchAccounts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${baseUrl}/accounts`);
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

    const handleOpen = (account) => {
        setSelectedAccount(account);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAccount(null);
    };

    const handleSaveChanges = async (updatedFields) => {
        // PATCH request to update account fields
        console.log("Updating account with fields:", updatedFields);
        try {
            const res = await fetch(`https://bank-uml.onrender.com/account/${selectedAccount.card_number}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFields)
            });
            if (!res.ok) throw new Error('Failed to update account');
            // Refresh accounts list
            const refreshed = await fetch('https://bank-uml.onrender.com/accounts');
            setAccounts(await refreshed.json());
            handleClose();
        } catch (err) {
            console.error('Patch account error:', err);
        }
    };

    return (
        <>
            <Stack>
                {loading && <Typography>Loading accounts...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                {!loading && !error && accounts.map((account, idx) => {
                    const cardNumber = account.card_number || account.primary_card_number || account.account_number || 'N/A';
                    const type = account.account_type || account.type || account.accountType || 'N/A';
                    const amount = (account.balance !== undefined && account.balance !== null) ? `${account.balance}$` : (account.amount ? `${account.amount}$` : '0.00$');
                    return (
                        <Card key={`${cardNumber}-${idx}`} sx={{ width: "100%", marginBottom: "2em" }}>
                            <Grid container>
                                <Grid item size={{ xs: 6, sm: 6 }} sx={{ paddingLeft: "1em" }}>
                                    <h4 style={{ textAlign: "start" }}>{'Card Number: ' + cardNumber}</h4>
                                    <h5 style={{ textAlign: "start" }}>{type}</h5>
                                    <p style={{ textAlign: "start" }}>{'Balance: ' + amount}</p>
                                </Grid>
                                <Grid item size={{ xs: 6, sm: 6 }}
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "end",
                                        display: "flex",
                                        flexDirection: "column",
                                        paddingRight: "1em"
                                    }}>
                                    <Button onClick={() => handleOpen(account)} endIcon={<ArrowForwardIosIcon />}>View Details</Button>
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
                    {selectedAccount && (
                        <DetailsOverlay
                            title="Account Details"
                            field={selectedAccount}
                            accountType={"teller"}
                            onClose={handleClose}
                            // editable={true}
                            onSave={handleSaveChanges}
                        />
                    )}
                </Box>
            </Modal>
        </>
    );
}
