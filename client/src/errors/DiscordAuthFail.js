export class DiscordAuthFail extends Error{
    constructor()
    {
        super("Failed to authenticate to DiscordSDK")
    }
}