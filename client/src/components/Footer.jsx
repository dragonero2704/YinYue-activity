import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from "../style.module.css"
export default function Footer(props)
{
    const year = new Date().getFullYear()
    return  (
        <footer>
            <span>Copyright </span>
            <FontAwesomeIcon icon="fa-brands fa-creative-commons" />
            <span> {year}-{year+1}</span>
        </footer>
    )
}