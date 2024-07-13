import { useState } from "react";
import Header from "./Header";
import FilterControls from "./FilterControls";
import LocationTable from "./table/LocationTable";

export default function FleetDashboard() {
  const [filter, setFilter] = useState<"all" | "starred">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header />
      <FilterControls
        filter={filter}
        onFilterChange={setFilter}
        onSearchChange={handleSearch}
      />
      <LocationTable filter={filter} searchQuery={searchQuery} />
    </>
  );
}
