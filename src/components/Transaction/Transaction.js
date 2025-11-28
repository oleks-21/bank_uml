import { useState } from "react";
import { Stack, TextField, Button, Typography, Card } from "@mui/material";
import { useSelector } from "react-redux";

export function Transaction({ accountType }) {
    const { user } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        card_number: "",
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

    const handleTransaction = async (type) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const baseUrl = "https://bank-uml.onrender.com";
            const res = await fetch(`${baseUrl}/transaction`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    card_number: formData.card_number,
                    amount: Number(formData.amount),
                    transaction_type: type,
                    customer_id: user?.customer_id
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Transaction failed");
            setSuccess("Transaction submitted for approval.");
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
                    Withdraw or Deposit Funds
                </Typography>
                <TextField
                    label="Card Number"
                    fullWidth
                    value={formData.card_number}
                    onChange={handleChange("card_number")}
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
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => handleTransaction("withdrawal")}
                        disabled={loading}
                        fullWidth
                    >
                        Withdraw
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        onClick={() => handleTransaction("deposit")}
                        disabled={loading}
                        fullWidth
                    >
                        Deposit
                    </Button>
                </Stack>
            </Stack>
        </Card>
    );
}
