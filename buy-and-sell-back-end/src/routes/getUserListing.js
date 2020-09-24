import { db } from "../database";

export const getUserListingRoute = {
  method: "GET",
  path: "/api/users/{userId}/listing",
  handler: async (req, h) => {
    const userId = req.params.userId;
    const { results } = await db.query(
      "SELECT * FROM listings WHERE user_id=?",
      [userId]
    );

    return results;
  },
};
