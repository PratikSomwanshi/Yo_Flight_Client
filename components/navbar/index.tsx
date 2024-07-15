import { getSession, logOut } from "@/utils/actions";
import Link from "next/link";
import React from "react";
import NavbarButton from "./navbarButton";
import Logo from "../logo";

async function Navbar() {
    const session = await getSession();
    console.log(session);

    const logout = async () => {
        "use server";
        await logOut();
    };

    return (
        <div className="h-12 flex justify-between items-center bg-gray-100 px-4 md:px-8">
            <Link href="/" className="h-full flex items-center">
                <h2>Yo_Flight</h2>
            </Link>
            <div className="flex w-full sm:w-[50%] md:w-[30%] justify-end sm:justify-between">
                {session.isLoggedIn ? (
                    <NavbarButton username={session.username} logout={logout} />
                ) : (
                    <div className="flex space-x-4">
                        <Link href="/login">
                            <div className="hover:text-blue-500">Login</div>
                        </Link>
                        <Link href="/register">
                            <div className="hover:text-blue-500">Register</div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
