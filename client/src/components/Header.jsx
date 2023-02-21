import React from "react";
import logo from "../assets/logo.jpg";

export default function Header() {
    return (
        <header>
            <nav className="navbar bg-light mb-4 p-0">
                <div className="container">
                    <a href="/" className="navbar-brand">
                        <div className="d-flex">
                            <img src={logo} alt="logo" />
                            <div>ProjectMGMT</div>
                        </div>
                    </a>
                </div>
            </nav>
        </header>
    );
}
