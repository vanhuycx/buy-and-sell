import { db } from "../database";
import * as admin from "firebase-admin";

export const deletetListingRoute = {
  method: "DELETE",
  path: "/api/listing/{id}",
  handler: async (req, h) => {
    const { id } = req.params;
    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    const userId = user.user_id;

    await db.query(`DELETE FROM listings where id =? AND user_id =?`, [
      id,
      userId,
    ]);
    return { message: "Delete success" };
  },
};
