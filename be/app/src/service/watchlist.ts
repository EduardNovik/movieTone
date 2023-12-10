import { Request, Response, Application } from "express";
import { db } from "../db.ts";
import {
  titlesToWatchlists,
  titles,
  watchlists,
} from "@movieTone/database-schema";
import crypto from "crypto";
import { getUserByIdentityIdService } from "./user.ts";

// addTitleToExistingWatchlist----
export async function addTitleToExistingWatchlist(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const {
      id,
      name,
      img,
      imdb,
      year,
      description,
      watchlistid,
      watchlistName,
      watchlistGenre,
    } = req.body;

    console.log("INPUTED DATA", id, name, img, imdb, year, description);

    const identityId = app.locals.identityId;
    const { id: userId } = await getUserByIdentityIdService(identityId);
    const titleId = crypto.randomUUID();

    const addedTitle = await db.transaction(async (trx) => {
      await trx.insert(titles).values({
        id: titleId,
        apiId: id,
        img,
        name,
        imdb,
        year,
        description,
      });

      await trx.insert(watchlists).values({
        id: watchlistid,
        name: watchlistName,
        userId,
        genre: watchlistGenre,
      });

      await trx.insert(titlesToWatchlists).values({
        titleId: titleId,
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

// addWathclist----
export async function addWatchlist(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, genre } = req.body;
    const identityId = app.locals.identityId;

    const { id: userId } = await getUserByIdentityIdService(identityId);

    console.log("INPUTED DATA", name, genre);

    const addedWatchlist = await db.transaction(async (trx) => {
      await trx.insert(watchlists).values({
        id: crypto.randomUUID(),
        name,
        userId,
        genre,
      });
    });
    console.log(addedWatchlist);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
