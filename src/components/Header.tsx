import React from "react";
import { Typography } from "@mui/material";

export default function Header() {
  return (
    <Typography
      variant="h5"
      component="h1"
      sx={{ fontWeight: 600, mb: "24px" }}
    >
      Your Fleet
    </Typography>
  );
}
