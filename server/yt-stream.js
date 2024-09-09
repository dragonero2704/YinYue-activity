import ytstream from "yt-stream"
import {Router} from "express"

const router = Router()

router.get("/search/:query", async (req, res)=>{
  const query = req.params["query"]
  const result = await ytstream.search(query)
  .catch(error=>{
    res.status(500).send(error)
  })
  res.send(result)
});


export {router as api_ytstream}



