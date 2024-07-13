import React, { useState } from "react";
import Header from "./Header";
import FilterControls from "./FilterControls";
import LocationTable from "./table/LocationTable";

export default function FleetDashboard() {
  const [filter, setFilter] = useState<"all" | "starred">("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header />
      <FilterControls
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <LocationTable filter={filter} searchQuery={searchQuery} />
    </>
  );
}
