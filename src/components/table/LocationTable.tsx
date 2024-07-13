import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

export default function LocationTable() {
  return (
    <div>
      <TableHeader />
      <TableBody />
      <Pagination />
    </div>
  );
}
