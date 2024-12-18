import React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./Layout";
import SearchBar from "./components/SearchBar";
import setupDiscordSdk from "./discord";
import "./style.css";
import SongEntry from "./components/Songentry";
// import rocketLogo from '/rocket.png';
const root = createRoot(document.querySelector("#app"));

root.render(
  <Layout className="dark">
    <h1 className="center">Please wait...</h1>
    <SearchBar />
    <div>
      <SongEntry
        title="Fe!n"
        thumbnail="https://i.ytimg.com/vi/B9synWjqBn8/default.jpg"
      />
    </div>
  </Layout>
);

setupDiscordSdk()
  .then(({ auth, discordSdk }) => {
    const { username } = auth.user;
    root.render(
      <Layout>
        <div className={style.center}>
          <h1>Discord SDK authenticated.</h1>
          <h1>Hello {username}!</h1>
        </div>
        <SearchBar />
      </Layout>
    );
  })
  .catch((error) => {
    console.error(error);
  });
