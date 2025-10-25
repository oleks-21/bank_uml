import React from "react";
import Stack from "@mui/material/Stack";
import { Grid, Card, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function TransactionHistory() {
  return (
        <Stack>
            <Card sx={{ width: "100%", marginBottom: "2em" }}>
                <Grid container>
                    <Grid size={{ xs: 6, sm: 6 }} sx={{paddingLeft:"1em"}}>
                        <h4 style={{ textAlign: "start" }}>Amount Paid: 1200$</h4>
                        <h5 style={{ textAlign: "start" }}>Card Number: 2496 0968 9621 1134</h5>
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
                        <h4 style={{ textAlign: "start" }}>Amount Paid: 200$</h4>
                        <h5 style={{ textAlign: "start" }}>Card Number: 4567 3423 1342 3453</h5>
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
                        <h4 style={{ textAlign: "start" }}>Amount Paid: 12$</h4>
                        <h5 style={{ textAlign: "start" }}>Card Number: 4567 3423 1342 3453</h5>
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