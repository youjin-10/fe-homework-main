import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import { debounce } from "../utils";

interface FilterControlsProps {
  filter: "all" | "starred";
  onFilterChange: (filter: "all" | "starred") => void;
  onSearchChange: (query: string) => void;
}

export default function FilterControls({
  filter,
  onFilterChange,
  onSearchChange,
}: FilterControlsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = debounce((query: string) => {
    onSearchChange(query);
  }, 500);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value as "all" | "starred")}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="all">All Locations</MenuItem>
        <MenuItem value="starred">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <StarIcon color="notice" />
            <span>Starred</span>
          </Box>
        </MenuItem>
      </Select>
      <TextField
        placeholder="Search robot ID or location"
        value={searchQuery}
        onChange={handleSearchChange}
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
