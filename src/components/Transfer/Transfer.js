import { useState } from "react";
import { Stack, TextField, Button, Typography, Card } from "@mui/material";

export function Transfer({ accountType }) {
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        amount: ""
    });

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleTransfer = () => {
        console.log("Transfer request:", formData);
        alert("Transfer button pressed — backend not yet implemented.");
    };

    return (
        <Card sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4 }}>
            <Stack spacing={3}>
                <Typography variant="h5" fontWeight="bold" textAlign="center">
                    Select Accounts to Transfer Funds
                </Typography>

                <TextField
                    label="From Account"
                    fullWidth
                    value={formData.from}
                    onChange={handleChange("from")}
                />

                <TextField
                    label="To Account"
                    fullWidth
                    value={formData.to}
                    onChange={handleChange("to")}
                />

                <TextField
                    label="Amount"
                    fullWidth
                    type="number"
                    value={formData.amount}
                    onChange={handleChange("amount")}
                />

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleTransfer}
                >
                    Transfer
                </Button>
            </Stack>
        </Card>
    );
}
