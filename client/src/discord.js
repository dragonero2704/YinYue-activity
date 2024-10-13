import { DiscordSDK, Events } from "@discord/embedded-app-sdk";

async function setupDiscordSdk() {
  const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
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
  if(!response.ok)
  {
    console.error(response.statusText)
  }
  const { access_token } = await response.json();

  // Authenticate with Discord client (using the access_token)
  let auth = await discordSdk.commands.authenticate({
    access_token,
  }).catch(authError=>console.error(authError));

  if (auth == null) {
    throw new Error("Authenticate command failed");
  }
  return {auth, discordSdk}
}

export default setupDiscordSdk
