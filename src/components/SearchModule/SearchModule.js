import React from "react";
import { TextField } from "@mui/material";
export function SearchModule() {
    return (
            <TextField
                id="search-filter-input"
                label="Search"
                type="filter"
                autoComplete="filter"
                fullWidth
                sx={{marginBottom:"1em"}}
            ></TextField>
    );
}