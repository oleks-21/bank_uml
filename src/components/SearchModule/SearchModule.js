import React from "react";
import { TextField } from "@mui/material";
export function SearchModule({ searchValue, onSearchChange }) {
    return (
        <TextField
            id="search-filter-input"
            label="Search"
            type="search"
            autoComplete="off"
            fullWidth
            sx={{ marginBottom: "1em" }}
            value={searchValue}
            onChange={onSearchChange}
        />
    );
}