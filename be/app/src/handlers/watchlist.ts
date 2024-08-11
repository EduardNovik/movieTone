import { Request, Response, Application } from "express";
import { db } from "../db.ts";
import {
  titlesToWatchlists,
  titles,
  watchlists,
} from "@movieTone/database-schema";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import {
  getUserByIdentityIdService,
  // getUsersWatchlistService,
} from "../services/userService.ts";

// addTitleAndCreateWatchlist-----------------------------

export async function addTitleAndCreateWatchlist(
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
      watchlistName,
      watchlistGenre,
    } = req.body;

    console.log(
      "addTitleAndCreateWatchlist [INPUTED DATA]",
      id,
      name,
      img,
      imdb,
      year,
      description,
      watchlistName,
      watchlistGenre
    );

    const identityId = app.locals.identityId;
    const { id: userId } = await getUserByIdentityIdService(identityId);
    const titleId = crypto.randomUUID();
    const watchlistId = crypto.randomUUID();

    const addedTitleAndWatchlist = await db.transaction(async (trx) => {
      await trx.insert(watchlists).values({
        id: watchlistId,
        name: watchlistName,
        userId,
        genre: watchlistGenre,
      });

      await trx.insert(titles).values({
        id: titleId,
        apiId: id,
        img,
        name,
        imdb,
        year,
        description,
      });

      const [adeedTitlesToWatchlists] = await trx
        .insert(titlesToWatchlists)
        .values({
          titleId: titleId,
          watchlistId: watchlistId,
        })
        .returning();

      return adeedTitlesToWatchlists;
    });

    res.status(200).json(addedTitleAndWatchlist);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

// addTitleToExistingWatchlist---------------------------------------------

export async function addTitleToExistingWatchlist(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { id, name, img, imdb, year, description, watchlistid } = req.body;

    console.log(
      "addTitleToExistingWatchlist [INPUTED DATA]",
      id,
      name,
      img,
      imdb,
      year,
      description
    );

    const titleId = crypto.randomUUID();

    const addedTitle = await db.transaction(async (trx) => {
      const [title] = await trx
        .insert(titles)
        .values({
          id: titleId,
          apiId: id,
          img,
          name,
          imdb,
          year,
          description,
        })
        .returning();

      await trx.insert(titlesToWatchlists).values({
        titleId: titleId,
        watchlistId: watchlistid,
      });

      return title;
    });

    res.status(200).json(addedTitle);
    console.log(addedTitle);

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

// addWathclist-----------------------------------------------------------

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
      return await trx
        .insert(watchlists)
        .values({
          id: crypto.randomUUID(),
          name,
          userId,
          genre,
        })
        .returning();
    });
    console.log(addedWatchlist);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

// getUsersWatchlists-----------------------------------------------------------

export async function getUsersWatchlist(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  const identityId = app.locals.identityId;
  const { id: userId } = await getUserByIdentityIdService(identityId);

  try {
    const watchlistsData = await db
      .select({
        id: watchlists.id,
        userId: watchlists.userId,
        name: watchlists.name,
        genre: watchlists.genre,
      })
      .from(watchlists)
      .where(eq(watchlists.userId, userId));
    res.status(200).json(watchlistsData);
    return watchlistsData;
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

// deleteWathclist-----------------------------------------------------------

export async function deleteWatchlist(
  req: Request,
  res: Response,
  app: Application
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { watchlistId } = req.body;
    const identityId = app.locals.identityId;
    console.log("[DELETED WATCHLIST]", watchlistId);

    // Check if there are related entries in titlesToWatchlists
    const relatedTitlesToWatchlists = await db
      .select()
      .from(titlesToWatchlists)
      .where(eq(titlesToWatchlists.watchlistId, watchlistId));

    if (relatedTitlesToWatchlists.length === 0) {
      console.log(
        "No related titles found. Skipping deletion of titlesToWatchlists and titles."
      );
      const deletedWatchlist = await db.transaction(async (trx) => {
        return await trx
          .delete(watchlists)
          .where(eq(watchlists.id, watchlistId))
          .returning();
      });
      console.log("deletedWatchlist", deletedWatchlist);
    } else {
      console.log("Related entries found, proceed with deletion");

      const deletedWatchlist = await db.transaction(async (trx) => {
        await trx
          .delete(titlesToWatchlists)
          .where(eq(titlesToWatchlists.watchlistId, watchlistId));

        await trx.delete(watchlists).where(eq(watchlists.id, watchlistId));
        await trx.delete(titles).where(eq(titles.id, watchlistId));
      });
      console.log("deletedWatchlist", deletedWatchlist);
    }
    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

// getTitlesInWathclist-----------------------------------------------------------

export async function getTitlesInWatchlist(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { watchlistId } = req.body;

    console.log("[Passed watchlist ID]", watchlistId);

    const fetchedTitlesInWatchlist = await db
      .select()
      .from(titlesToWatchlists)
      .where(eq(titlesToWatchlists.watchlistId, watchlistId))
      .innerJoin(titles, eq(titles.id, titlesToWatchlists.titleId));

    console.log(fetchedTitlesInWatchlist);
    res.status(200).json({ titles: fetchedTitlesInWatchlist });
  } catch (error) {
    console.error("Error fetching titles in watchlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
