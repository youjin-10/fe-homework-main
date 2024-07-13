import React from "react";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface FilterControlsProps {
  filter: "all" | "starred";
  onFilterChange: (filter: "all" | "starred") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function FilterControls({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: FilterControlsProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value as "all" | "starred")}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="all">All Locations</MenuItem>
        <MenuItem value="starred">Starred</MenuItem>
      </Select>
      <TextField
        placeholder="Search robot ID or location"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ minWidth: 300 }}
      />
    </Box>
  );
}
