import React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button, Box, Modal } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";

export function Transfer(accountType) {
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);

    const fields = [
        { labelAmount: "Amount Paid: ", valueAmount: "1200$", labelNumber: "Card Number: ", valueNumber: "2496 0968 9621 1134", labelDate: "Date of Payment: ", valueDate: "2014-03-14", labelTime: "Time: ", value: "13:44" },
        { labelAmount: "Amount Paid: ", valueAmount: "200$", labelNumber: "Card Number: ", valueNumber: "4567 3423 1342 3453", labelDate: "Date of Payment: ", valueDate: "2018-09-11", labelTime: "Time: ", value: "08:32" },
        { labelAmount: "Amount Paid: ", valueAmount: "12$", labelNumber: "Card Number: ", valueNumber: "4567 3423 1342 3453", labelDate: "Date of Payment: ", valueDate: "2014-12-26", labelTime: "Time: ", value: "19:04" },
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
                                <h4 style={{ textAlign: "start" }}>{field.labelAmount + field.valueAmount}</h4>
                                <h5 style={{ textAlign: "start" }}>{field.labelNumber + field.valueNumber}</h5>
                            </Grid>
                            <Grid size={{ xs: 6, sm: 6 }} sx={{ justifyContent: "center", alignItems: "end", display: "flex", flexDirection: "column", paddingRight: "1em" }}>
                                <Button endIcon={<ArrowForwardIosIcon />}
                                    onClick={() => handleOpen(field)}
                                >View Details
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
                            title="Transaction History"
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