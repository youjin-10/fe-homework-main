import { IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { GridRenderCellParams } from "@mui/x-data-grid";

interface StarCellProps extends GridRenderCellParams {
  starredLocationIds: number[];
  onStarLocation: (locationId: number, isStarred: boolean) => void;
}

export default function StarCell({
  id,
  starredLocationIds,
  onStarLocation,
}: StarCellProps) {
  return (
    <IconButton
      onClick={() =>
        onStarLocation(id as number, !starredLocationIds.includes(id as number))
      }
    >
      {starredLocationIds.includes(id as number) ? (
        <StarIcon color="notice" />
      ) : (
        <StarBorderIcon />
      )}
    </IconButton>
  );
}
