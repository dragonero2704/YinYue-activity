import React from "react";
import Footer from "./components/Footer";
import style from "./style.module.css";
export default function Layout({children, className})
{
    return (
        <div className={className}>
            {children}
            <Footer/>
        </div>
    )
}
