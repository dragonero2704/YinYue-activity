import ytstream from "yt-stream"
import {Router} from "express"

const router = Router()

router.get("/search/:query", (req, res)=>{
  res.send(req.params["query"]);
});


export {router as api_ytstream}



