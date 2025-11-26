import React from "react";
import { Stack, Card, Typography, Button, Divider, Grid, TextField } from "@mui/material";
export function DetailsOverlay({ title, field, onClose, accountType }) {
    if (!field) return null;

    return (
        <Card sx={{ p: 3, maxHeight: "70vh", overflowY: "auto"}} >
            <Stack spacing={2}>
                {/* Title Section */}
                <Typography variant="h6" gutterBottom>
                    {title || "Details"}
                </Typography>

                <Divider />

                {/* Dynamic Info Rendering */}
                {Object.entries(field).map(([key, value]) => (

                    <>
                        {((accountType === "teller" || accountType === "manager") && (key.substring(0, 5) == "value")) ? <TextField key={key} defaultValue={value}></TextField> :
                            <Typography key={key}>
                                {value}
                            </Typography>
                        }

                    </>


                ))}

                <Divider sx={{ my: 1 }} />

                {/* Close Button */}
                <Grid container>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        {((accountType === "teller" || accountType === "manager"))
                            &&
                            <Button
                                variant="contained"
                                color="success"
                                onClick={onClose}
                                sx={{ float: "right" }}
                            >
                                Save Changes
                            </Button>
                        }
                    </Grid>


                </Grid>

            </Stack>
        </Card>
    );
}

// Helper function to make key names more readable
function formatLabel(label) {
    return label
        .replace(/([A-Z])/g, " $1") // split camelCase
        .replace(/_/g, " ") // replace underscores
        .replace(/\b\w/g, (c) => c.toUpperCase()) // capitalize words
        .trim();
}
