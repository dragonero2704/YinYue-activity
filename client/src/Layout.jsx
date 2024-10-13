import React from "react";
import Footer from "./components/Footer";
export default function Layout({children})
{
    return (
        <div>
        {children}
        <Footer/>
        </div>
    )
}
