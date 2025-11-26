import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button, Box, Modal } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";
import { useSelector } from "react-redux";

export function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);

    const { user } = useSelector((state) => state.user);  // get logged-in user

    // Fetch real transaction history
    useEffect(() => {
        if (!user?.customer_id) return;

        fetch(`https://bank-uml.onrender.com/transactions/${user.customer_id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched transactions:", data);
                setTransactions(data);
            })
            .catch((err) => console.error("Failed to fetch transactions:", err));
    }, [user]);

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
                {transactions.map((t) => (
                    <Card key={t.transaction_id} sx={{ width: "100%", mb: 2 }}>
                        <Grid container>
                            <Grid xs={6} sx={{ pl: 2 }}>
                                <h4 style={{ textAlign: "start" }}>
                                    Amount: ${t.amount}
                                </h4>
                                <h5 style={{ textAlign: "start" }}>
                                    Card Number: {t.card_number}
                                </h5>
                            </Grid>

                            <Grid 
                                xs={6} 
                                sx={{ justifyContent: "center", alignItems: "end", display: "flex", flexDirection: "column", paddingRight: "1em" }}
                            >
                                <Button
                                    endIcon={<ArrowForwardIosIcon />}
                                    onClick={() => handleOpen(t)}
                                >
                                    View Details
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                ))}

                {transactions.length === 0 && (
                    <p style={{ textAlign: "center", opacity: 0.6 }}>
                        No transactions found.
                    </p>
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
                            title="Transaction History"
                            field={selectedField}
                            onClose={handleClose}
                        />
                    )}
                </Box>
            </Modal>
        </>
    );
}
