import { useState } from "react";
import { Stack, TextField, Button, Typography, Card } from "@mui/material";

export function Transfer({ accountType }) {
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        amount: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        setError(null);
        setSuccess(null);
    };

    const handleTransfer = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const baseUrl = "https://bank-uml.onrender.com";
            const res = await fetch(`${baseUrl}/transfer`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    from: formData.from,
                    to: formData.to,
                    amount: Number(formData.amount)
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Transfer failed");
            setSuccess(data.pending ? "Transfer submitted for approval." : "Transfer successful!");
        } catch (err) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
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

                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="success.main">{success}</Typography>}

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleTransfer}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Transfer"}
                </Button>
            </Stack>
        </Card>
    );
}
