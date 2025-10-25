import React from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export function AccountsList() {
    return (
        <Stack>
            <Card sx={{ width: "100%", marginBottom: "2em" }}>
                <Grid container>
                    <Grid size={{ xs: 6, sm: 6 }} sx={{paddingLeft:"1em"}}>
                        <h4 style={{ textAlign: "start" }}>Card Number: 4053 4556 7771 2345</h4>
                        <h5 style={{ textAlign: "start" }}>Chequing</h5>
                        <p style={{ textAlign: "start" }}>Balance: 500.00$</p>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 6 }} sx={{justifyContent:"center", alignItems:"end", display:"flex", flexDirection:"column", paddingRight:"1em"}}>
                        <Button>View Details
                            <ArrowForwardIosIcon></ArrowForwardIosIcon>
                        </Button>
                    </Grid>
                </Grid>
            </Card>

            <Card sx={{ width: "100%", marginBottom: "2em" }}>
                <Grid container>
                    <Grid size={{ xs: 6, sm: 6 }} sx={{paddingLeft:"1em"}}>
                        <h4 style={{ textAlign: "start" }}>Card Number: 2496 0968 9621 1134</h4>
                        <h5 style={{ textAlign: "start" }}>Savings</h5>
                        <p style={{ textAlign: "start" }}>Balance: 1305.75$</p>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 6 }} sx={{justifyContent:"center", alignItems:"end", display:"flex", flexDirection:"column", paddingRight:"1em"}}>
                        <Button>View Details
                            <ArrowForwardIosIcon></ArrowForwardIosIcon>
                        </Button>
                    </Grid>
                </Grid>
            </Card>
            <Card sx={{ width: "100%", marginBottom: "2em" }}>
                <Grid container>
                    <Grid size={{ xs: 6, sm: 6 }} sx={{paddingLeft:"1em"}}>
                        <h4 style={{ textAlign: "start" }}>Card Number: 4567 3423 1342 3453</h4>
                        <h5 style={{ textAlign: "start" }}>Savings</h5>
                        <p style={{ textAlign: "start" }}>Balance: 1100.75$</p>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 6 }} sx={{justifyContent:"center", alignItems:"end", display:"flex", flexDirection:"column", paddingRight:"1em"}}>
                        <Button>View Details
                            <ArrowForwardIosIcon></ArrowForwardIosIcon>
                        </Button>
                    </Grid>
                </Grid>
            </Card>

        </Stack>
    );
}