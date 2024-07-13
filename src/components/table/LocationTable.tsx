import { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { PAGE_SIZE } from "../../constants";

import StarCell from "./StarCell";
import LocationNameCell from "./LocationNameCell";
import RobotCell from "./RobotCell";

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
        <StarCell
          {...params}
          starredLocationIds={starredLocationIds}
          onStarLocation={handleStarLocation}
        />
      ),
    },
    {
      field: "name",
      headerName: "Locations",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <LocationNameCell {...params} />
      ),
    },
    {
      field: "robot",
      headerName: "Robots",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <RobotCell {...params} />,
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
