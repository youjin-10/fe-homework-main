import { rest } from "msw";
import { Location, locations } from "./db";
import { PAGE_SIZE } from "../constants";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

export const handlers = [
  rest.get("/locations", (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get("page") || "1");
    const search = req.url.searchParams.get("search") || "";
    const isStarred = req.url.searchParams.get("is_starred") === "true";
    const pageSize = PAGE_SIZE;

    let filteredLocations = locations.filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(search.toLowerCase()) ||
        location.robot?.id.toLowerCase().includes(search.toLowerCase());

      const starredMatch = isStarred
        ? JSON.parse(
            sessionStorage.getItem("starred_location_ids") || "[]"
          ).includes(location.id)
        : true;

      return matchesSearch && starredMatch;
    });

    const totalCount = filteredLocations.length;
    const paginatedLocations = filteredLocations.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    const result: LocationsResult = {
      total_count: totalCount,
      locations: paginatedLocations,
    };

    return res(ctx.status(200), ctx.json(result));
  }),

  rest.get("/starred_location_ids", (req, res, ctx) => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]"
    );

    return res(
      ctx.status(200),
      ctx.json({
        location_ids,
      })
    );
  }),

  rest.put("/starred_location_ids", (req, res, ctx) => {
    if (!req.body) {
      return res(
        ctx.status(500),
        ctx.json({ error_msg: "Encountered unexpected error" })
      );
    }

    sessionStorage.setItem("starred_location_ids", JSON.stringify(req.body));

    return res(ctx.status(204));
  }),
];
