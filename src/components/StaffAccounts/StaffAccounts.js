import React from "react";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button, Box, Modal } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";

export function StaffAcounts({ accountType }) {
    console.log("accountType>>> ", accountType)
    const [selectedField, setSelectedField] = useState(null);
    const [open, setOpen] = useState(false);

    const fields = [
        { labelName: "Full Name: ", valueName: "Teller Doe", labelEmail: "Email: ", valueEmail: "teller.doe@gmail.com", labelDate: "Date of Birth: ", valueDate: "1994-03-14", labelAddress: "Address: ", valueAddress: "Canada Ontario, Toronto 290 Bremner Boulevard M5V 3L9" },
        { labelName: "Full Name: ", valueName: "Auditor Doe", labelEmail: "Email: ", valueEmail: "auditor.doe@gmail.com", labelDate: "Date of Birth: ", valueDate: "1993-07-12", labelAddress: "Address: ", valueAddress: "Canada Quebec, Montreal 123 Saint-Catherine DFG 3R5" },
        { labelName: "Full Name: ", valueName: "Teller Smith", labelEmail: "Email: ", valueEmail: "teller.smith@gmail.com", labelDate: "Date of Birth: ", valueDate: "1978-04-30", labelAddress: "Address: ", valueAddress: "Canada Ontario, Toronto 295 Bremner Boulevard M6V 3L9" },
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
                                <h4 style={{ textAlign: "start" }}>{field.labelName + field.valueName}</h4>
                                <h5 style={{ textAlign: "start" }}>{field.labelEmail + field.valueEmail}</h5>
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
                            title="Staff Account"
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
