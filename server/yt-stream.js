import ytstream from "yt-stream"
import {Router} from "express"
import {logger} from "./logger.js"

const router = Router()
const cache = new Map()

router.get("/search/:query", 
  async (req, res)=>{
  const query = req.params["query"]
  logger.info(`Searching [${query}]`)

  if(cache.has(query))
  {
    res.send(cache[query])
    return
  }

  const results = await ytstream.search(query)
  .catch(error=>{
    res.status(500).send(error)
  })
  logger.info(`${results.length} results found`)
  cache[query] = results
  setTimeout(()=>{
    logger.info(`Deleting cache [${query}] : ttl reached 0`)
    cache.delete(query)
  }, 60_000)
  res.send(results)
});

router.get("/search/:query/:limit", async (req, res)=>{
  const query = req.params["query"]
  const limit = parseInt(req.params["limit"])
  if(cache.has(query))
  {
    const results = cache[query]
  }else{
    const results = await ytstream.search(query)
    .catch(error=>res.status(500).send(error))
    cache[query] = results
    setTimeout(()=>{
      logger.info(`Deleting cache [${query}] : ttl reached 0`)
      cache.delete(query)
    }, 60_000)
  }
  
  const sliced = results.slice(0,limit)
  logger.info(`${results.length} results found`)
  res.send(sliced)
})


export {router as api_ytstream}



