import { Request, Response, Application } from "express";
import { db } from "../db.ts";
import { watchlist, usersToWatchlist } from "@movieTone/database-schema";
import { getUserByIdentityId } from "./user.ts";

// addToWathclist----
export async function addToWatchlist(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { id, name, img, imdb, year, description } = req.body;

    console.log("INPUTED DATA", id, name, img, imdb, year, description);

    const userById = await getUserByIdentityId(req, res, app);

    // const watchlistTitle = await db
    //   .insert(watchlist)
    //   .values({
    //     id,
    //     name,
    //     img,
    //     imdb,
    //     year,
    //     description,
    //   })
    //   .returning();

    const watchlistTitle = await db.transaction(async (trx) => {
      const watchlistId = crypto.randomUUID();

      await trx.insert(watchlist).values({
        id: watchlistId,
        name,
        img,
        imdb,
        year,
        description,
      });
      await trx.insert(usersToWatchlist).values({
        watchlistId: watchlistId,
        userId: userById,
      });
    });

    res.status(200).json(watchlistTitle);
    console.log(watchlistTitle);

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
