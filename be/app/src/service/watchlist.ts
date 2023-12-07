import { Request, Response, Application } from "express";
import { db } from "../db.ts";
import { titlesToWatchlists, titles } from "@movieTone/database-schema";

// addToWathclist----
export async function addTitleToWatchlist(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { id, name, img, imdb, year, description, watchlistid } = req.body;

    console.log("INPUTED DATA", id, name, img, imdb, year, description);

    const addedTitle = await db.transaction(async (trx) => {
      await trx.insert(titles).values({
        id: id,
        name,
        img,
        imdb,
        year,
        description,
      });
      await trx.insert(titlesToWatchlists).values({
        titleId: id,
        watchlistId: watchlistid,
      });
    });

    res.status(200).json(addedTitle);
    console.log(addedTitle);

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
