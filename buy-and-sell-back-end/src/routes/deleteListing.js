import { db } from "../database";
export const deletetListingRoute = {
  method: "DELETE",
  path: "/api/listing/{id}",
  handler: async (req, h) => {
    const { id } = req.params;
    await db.query(`DELETE FROM listings where id =?`, [id]);
    return { message: "Delete success" };
  },
};
