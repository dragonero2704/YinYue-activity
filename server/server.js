import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import {logger} from "./logger.js";
import path, { dirname } from "path"
dotenv.config({ path: "../.env" });


const server = express();
const port = 3001;

// Allow express to parse JSON bodies
server.use(express.json());
server.use(express.static('public'))
server.set("view-engine", "ejs")
server.get("/", (req, res)=>{
  res.sendFile(import.meta.dirname + "/index.html")
})

server.post("/api/token", async (req, res) => {
  
  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "serverlication/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  // Retrieve the access_token from the response
  const { access_token } = await response.json()
  .catch(error=>res.status(500).send(error));

  // Return the access_token to our client as { access_token: "..."}
  res.send({access_token});
});

import {api_ytstream} from "./yt-stream.js"


server.use("/api/yt-stream", api_ytstream)

server.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});