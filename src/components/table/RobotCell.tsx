import { Button } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { GridRenderCellParams } from "@mui/x-data-grid";

export default function RobotCell({ value }: GridRenderCellParams) {
  return value.id ? (
    <span>
      <CircleIcon
        color={value.is_online ? "success" : "disabled"}
        style={{
          fontSize: "small",
          marginRight: "5px",
        }}
      />
      {value.id}
    </span>
  ) : (
    <Button size="small" sx={{ color: "#3A5FFF", textDecoration: "underline" }}>
      Add
    </Button>
  );
}
