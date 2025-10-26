import React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button, Box, Modal } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";

export function PendingTransactions({ accountType }) {
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);
    const fields = [
        { labelName: "Full Name: ", valueName: "John Doe", labelCard: "Card Number: ", valueCard: "4503 3244 1122 4134", labelTransaction: "Transaction Amount: ", valueTransaction: "5043$", labelEmail: "Email: ", valueEmail: "john.doe@gmail.com", labelDate: "Date of Birth: ", valueDate: "1994-03-14", labelAddress: "Address: ", value: "Canada Ontario, Toronto 290 Bremner Boulevard M5V 3L9" },
        { labelName: "Full Name: ", valueName: "Jane Doe", labelCard: "Card Number: ", valueCard: "1234 4542 2311 1234", labelTransaction: "Transaction Amount: ", valueTransaction: "250$", labelEmail: "Email: ", valueEmail: "jane.doe@gmail.com", labelDate: "Date of Birth: ", valueDate: "1993-07-12", labelAddress: "Address: ", value: "Canada Quebec, Montreal 123 Saint-Catherine DFG 3R5" },
        { labelName: "Full Name: ", valueName: "Bill Doe", labelCard: "Card Number: ", valueCard: "3255 3524 9887 3310", labelTransaction: "Transaction Amount: ", valueTransaction: "20$", labelEmail: "Email: ", valueEmail: "bill.doe@gmail.com", labelDate: "Date of Birth: ", valueDate: "1978-04-30", labelAddress: "Address: ", value: "Canada Ontario, Toronto 295 Bremner Boulevard M6V 3L9" },
    ]
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
                {fields.map((field) => (

                    <Card sx={{ width: "100%", marginBottom: "2em" }}>
                        <Grid container>
                            <Grid size={{ xs: 6, sm: 6 }} sx={{ paddingLeft: "1em" }}>
                                <h4 style={{ textAlign: "start" }}>{field.labelCard + field.valueCard}</h4>
                                <h5 style={{ textAlign: "start" }}>{field.labelTransaction + field.valueTransaction}</h5>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6 }} sx={{ justifyContent: "center", alignItems: "end", display: "flex", flexDirection: "column", paddingRight: "1em" }}>
                                <Button endIcon={<ArrowForwardIosIcon />}
                                    onClick={() => handleOpen(field)}>View Details
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                ))}



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
