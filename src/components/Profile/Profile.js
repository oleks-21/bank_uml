import React from "react";
import { Stack, Grid, Card, Button, TextField, Typography } from "@mui/material";

export function Profile() {
  return (
    <Card sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Stack spacing={2}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ textAlign: "start", width:"100px" }}>
              First Name:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth defaultValue="John" variant="outlined" size="small" />
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ textAlign: "start", width:"100px" }}>
              Last Name:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth defaultValue="Doe" variant="outlined" size="small" />
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ textAlign: "start", width:"100px" }}>
              Email:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth defaultValue="john.doe@gmail.com" variant="outlined" size="small" />
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ textAlign: "start", width:"100px" }}>
              Date of Birth:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth defaultValue="1994-03-14" variant="outlined" size="small" />
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ textAlign: "start", width:"100px" }}>
              Country:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth defaultValue="Canada" variant="outlined" size="small" />
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ textAlign: "start", width:"100px" }}>
              Province:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth defaultValue="Ontario" variant="outlined" size="small" />
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ textAlign: "start", width:"100px" }}>
              City:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField fullWidth defaultValue="Toronto" variant="outlined" size="small" />
          </Grid>
        </Grid>

        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ textAlign: "start", width:"100px" }}>
              Address:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              defaultValue="290 Bremner Boulevard M5V 3L9"
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          <Button variant="contained" color="success">Save Changes</Button>
        </Grid>
      </Stack>
    </Card>
  );
}
