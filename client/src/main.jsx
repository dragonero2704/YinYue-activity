import "../style.css";
import React from "react";
import {createRoot} from "react-dom/client";
import Layout from "./Layout"
import SearchBar from "./components/SearchBar";
import setupDiscordSdk from "./discord"

// import rocketLogo from '/rocket.png';
const root = createRoot(document.querySelector('#app'))

root.render(
    <Layout>
        <h1 className="center">Please wait...</h1>
        <SearchBar/>
    </Layout>
)


setupDiscordSdk()
.then(({auth, discordSdk})=>{
    const {username} = auth.user
    root.render(
        <Layout>
            <div className="center">
                <h1>Discord SDK authenticated.</h1>
                <h1>Hello {username}!</h1>
            </div>
        </Layout>
        
    );
})
.catch((error)=>{
    console.log(error)
})




