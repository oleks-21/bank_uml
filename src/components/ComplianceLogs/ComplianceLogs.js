import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button, Typography, Modal, Box } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";
export function ComplianceLogs(accountType) {
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);

    const fields = [
        { labelNumber: "Card Number: ", valueNumber: "4053 4556 7771 2345", labelType: "Type: ", valueType: "Chequing", labelAmount: "Amount Paid: ", valueAmount: "500.00$", labelDate: "Date of Payment: ", valueDate: "2020-05-15" },
        { labelNumber: "Card Number: ", valueNumber: "2496 0968 9621 1134", labelType: "Type: ", valueType: "Savings", labelAmount: "Amount Paid: ", valueAmount: "1305.75$", labelDate: "Date of Payment: ", valueDate: "2021-01-25" },
        { labelNumber: "Card Number: ", valueNumber: "4053 4556 7771 2345", labelType: "Type: ", valueType: "Chequing", labelAmount: "Amount Paid: ", valueAmount: "1100.75$", labelDate: "Date of Payment: ", valueDate: "2016-06-15" },
    ]
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
                {fields.map((field) => (

                    <Card sx={{ width: "100%", marginBottom: "2em" }}>
                        <Grid container>
                            <Grid size={{ xs: 6, sm: 6 }} sx={{ paddingLeft: "1em" }}>
                                <h4 style={{ textAlign: "start" }}>{field.labelNumber + field.valueNumber}</h4>
                                <h5 style={{ textAlign: "start" }}>{field.valueType}</h5>
                                <p style={{ textAlign: "start" }}>{field.labelAmount + field.valueAmount}</p>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6 }} sx={{ justifyContent: "center", alignItems: "end", display: "flex", flexDirection: "column", paddingRight: "1em" }}>
                                <Button onClick={() => handleOpen(field)}
                                    endIcon={<ArrowForwardIosIcon />}>View Details
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