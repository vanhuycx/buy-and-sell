import { fakeListings } from "./fake-data";

export const getAllListingsRoute = {
  method: "GET",
  path: "/api/listing",
  handler: (req, h) => {
    return fakeListings;
  },
};
