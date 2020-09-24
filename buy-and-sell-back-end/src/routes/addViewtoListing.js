import { db } from "../database";
import {} from "@hapi/boom";
export const addViewToListingRoute = {
  method: "POST",
  path: "/api/listing/{id}/add-view",
  handler: async (req, h) => {
    const id = req.params.id;
    await db.query("UPDATE listings SET views=views+1 WHERE id=?", [id]);
    const { results } = await db.query("SELECT * FROM listings where id=?", [
      id,
    ]);
    const updatedListings = results[0];
    if (!updatedListings)
      throw Boom.notFound(`Listing does not exist with id ${id}`);
    return updatedListings;
  },
};
