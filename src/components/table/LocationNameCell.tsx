import { styled, ButtonProps, Button } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

const LocationNameButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#fff",
  backgroundColor: theme.palette.secondary.main,
  "&:disabled": {
    color: "#fff",
    backgroundColor: theme.palette.grey[300],
  },
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function LocationNameCell({ row, value }: GridRenderCellParams) {
  return (
    <LocationNameButton disabled={!row.robot.is_online} variant="contained">
      {value}
    </LocationNameButton>
  );
}
