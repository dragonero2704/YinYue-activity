import ytstream from "yt-stream";
import { Router } from "express";
import { logger } from "./logger.js";

const router = Router();
const cache = new Map();
const cachettl = 60_000; // 60s

async function search(query) {
  return new Promise(async (resolve, reject) => {
    if (cache.has(query)) {
      logger.info(`Retrieving cached results for [${query}]`);
      resolve(cache.get(query));
    } else {
      logger.info(`Searching on youtube.com for [${query}]`)
      const results = await ytstream
        .search(query)
        .catch((error) => reject(error));
      if (!results) reject("No results");
      // cache the result
      cache.set(query, results)
      // set the timeout
      setTimeout(()=>{
        logger.info(`Deleting cache record for [${query}]`)
        cache.delete(query)
      }, cachettl)
      // resolve 
      resolve(cache.get(query));
    }
  });
}

router.get("/search/:query", async (req, res) => {
  search(req.params["query"])
  .then(results=>res.send(results))
  .catch(error=>res.status(500).send(error))
});

router.get("/search/:query/:limit", async (req, res) => {
  const limit = req.params["limit"]
  search(req.params["query"])
  .then(results=>res.send(results.slice(0, limit)))
  .catch(error=>res.status(500).send(error))
  });

export { router as api_ytstream };
