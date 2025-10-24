import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Box, Card } from "@mui/material";
import { SideBar } from "../SideBar/SideBar";

export function AccountPage() {
    const location = useLocation();
    const accountType = location.state?.accountType || "user"; // fallback

    return (
        <Box
            sx={{
                padding: 4,
            }}
        >
            <Grid
                container
                spacing={4}
            >
                <Grid size={{ xs: 12, sm: 4 }}>
                    <SideBar accountType={accountType} />
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }}>
                    <Card
                        sx={{
                            height: "100%",
                            display: "flex",
                            paddingLeft: "2em",
                            paddingRight: "2em",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <h2>Welcome to your dashboard</h2>
                            <p>
                                Content will be presented here.
                            </p>
                        </div>
                    </Card>
                </Grid>


            </Grid>
        </Box>
    );
}
