import React from "react";
import Footer from "./components/Footer";
import "./style.css";
export default function Layout({children, className})
{
    return (
        <div className={className}>
            {children}
            <Footer/>
        </div>
    )
}
