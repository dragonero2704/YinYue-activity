import ytstream from "yt-stream"
import {Router} from "express"
import {logger} from "./logger.js"
const router = Router()

router.get("/search/:query", async (req, res)=>{
  const query = req.params["query"]
  logger.info(`Searching [${query}]`)
  const results = await ytstream.search(query)
  .catch(error=>{
    res.status(500).send(error)
  })
  logger.info(`${results.length} results found`)
  res.send(results)
});


export {router as api_ytstream}



