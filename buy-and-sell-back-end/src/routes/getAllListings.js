// import { fakeListings } from "./fake-data";
import { db } from "../database";

export const getAllListingsRoute = {
  method: "GET",
  path: "/api/listing",
  handler: async (req, h) => {
    const { results } = await db.query("SELECT * FROM listings");
    return results;
  },
};
