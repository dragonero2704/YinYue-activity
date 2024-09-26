import { DiscordSDK, Events } from "@discord/embedded-app-sdk";

import "./style.css";
// import rocketLogo from '/rocket.png';
/* 
  Local development variables
*/
const local = true
//

let users = ["Tester"]
if(!local) {
  // Instantiate the SDK
  const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
  setupDiscordSdk().then(async () => {
    console.log("Discord SDK is ready");
    
    // Fetch
    const users = await discordSdk.commands.getInstanceConnectedParticipants();

    // Subscribe listener
    function updateParticipants(participants) {
      // update users
      let users
      // Do something really cool
    }
    discordSdk.subscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, updateParticipants);
    // Unsubscribe
    discordSdk.unsubscribe(Events.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE, updateParticipants);

  });
}

let auth;

async function setupDiscordSdk() {
  await discordSdk.ready();

  // Authorize with Discord Client
  const { code } = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: [
      "identify",
      "guilds",
      "applications.commands"
    ],
  });

  // Retrieve an access_token from your activity's server
  // Note: We need to prefix our backend `/api/token` route with `/.proxy` to stay compliant with the CSP.
  // Read more about constructing a full URL and using external resources at
  // https://discord.com/developers/docs/activities/development-guides#construct-a-full-url
  const response = await fetch("/.proxy/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });
  const { access_token } = await response.json();

  // Authenticate with Discord client (using the access_token)
  auth = await discordSdk.commands.authenticate({
    access_token,
  }).catch(authError=>console.error(authError));

  if (auth == null) {
    throw new Error("Authenticate command failed");
  }
}
// homepage html
const html = `
<div>
    <h1>Welcome</h1>
    <h3>Currently in activity: ${users.join(", ")}</h3>
    
    <input type="text">
    <button onclick="alert('clicked')">cerca</button>
    
</div>
`;

document.querySelector('#app').innerHTML = html
