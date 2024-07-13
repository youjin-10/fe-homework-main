import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import CircleIcon from "@mui/icons-material/Circle";
import { PAGE_SIZE } from "../../constants";

interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  };
}

interface LocationTableProps {
  filter: "all" | "starred";
  searchQuery: string;
}

export default function LocationTable({
  filter,
  searchQuery,
}: LocationTableProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [starredLocationIds, setStarredLocationIds] = useState<number[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/locations?page=${
            paginationModel.page + 1
          }&location_name=${searchQuery}&is_starred=${filter === "starred"}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLocations(data.locations);
        setTotalCount(data.total_count);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchStarredLocationIds = async () => {
      try {
        const response = await fetch("/starred_location_ids");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setStarredLocationIds(
          Array.isArray(data.location_ids) ? data.location_ids : []
        );
      } catch (error) {
        console.error("Error fetching starred location ids:", error);
        setStarredLocationIds([]);
      }
    };

    fetchLocations();
    fetchStarredLocationIds();
  }, [filter, searchQuery, paginationModel.page]);

  const handleStarLocation = async (locationId: number, isStarred: boolean) => {
    try {
      let newStarredIds: number[];
      if (isStarred) {
        newStarredIds = [...starredLocationIds, locationId];
      } else {
        newStarredIds = starredLocationIds.filter((id) => id !== locationId);
      }

      const response = await fetch("/starred_location_ids", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStarredIds),
      });

      if (!response.ok) {
        throw new Error("Failed to update starred locations");
      }

      setStarredLocationIds(newStarredIds);
    } catch (error) {
      console.error("Error updating starred location:", error);
      alert("Could not star an item due to unexpected error");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "starred",
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          onClick={() =>
            handleStarLocation(
              params.row.id,
              !starredLocationIds.includes(params.row.id)
            )
          }
        >
          {starredLocationIds.includes(params.row.id) ? (
            <StarIcon color="primary" />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      ),
    },
    {
      field: "name",
      headerName: "Location",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip
          title={params.row.robot.is_online ? "Robot Online" : "Robot Offline"}
        >
          <span
            style={{ color: params.row.robot.is_online ? "blue" : "inherit" }}
          >
            {params.value}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "robot",
      headerName: "Robot",
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.value.id ? (
          <span>
            <CircleIcon
              style={{
                color: params.value.is_online ? "green" : "grey",
                fontSize: "small",
                marginRight: "5px",
              }}
            />
            {params.value.id}
          </span>
        ) : (
          <span style={{ color: "blue", cursor: "pointer" }}>Add</span>
        ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={locations}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[PAGE_SIZE]}
        rowCount={totalCount}
        loading={loading}
        paginationMode="server"
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
