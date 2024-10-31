import React, { useState } from "react"

export default function SongEntry({thumbnail, title})
{
    const [query, setQuery] = useState()
    return (
        <span>
            <img src={thumbnail}alt={title}></img>
            <p>{title}</p>
        </span>
    )
}