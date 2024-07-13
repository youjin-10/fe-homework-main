import React from "react";
import Header from "./Header";
import FilterControls from "./FilterControls";
import LocationTable from "./table/LocationTable";

export default function FleetDashboard() {
  return (
    <div>
      <div>FleetDashboard</div>
      <Header />
      <FilterControls />
      <LocationTable />
    </div>
  );
}
