"use client";
import { SessionData } from "@/utils/lib";
import { IronSession } from "iron-session";
import React from "react";

function NavbarButton({
    logout,
    username,
}: {
    logout: () => void;
    username: string | undefined;
}) {
    const handleLogout = () => {
        logout(); // Call the logout function
    };
    return (
        <button onClick={handleLogout}>
            <div>Hello, {username}</div>
        </button>
    );
}

export default NavbarButton;
