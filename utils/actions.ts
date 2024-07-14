"use server";
import { SessionData, defaultSession, sessionOptions } from "@/utils/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
    const session = await getIronSession<SessionData>(
        cookies(),
        sessionOptions
    );

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
};

interface loginData {
    username: string;
    password: string;
}

interface registerData {
    username: string;
    email: string;
    fullName: string;
    password: string;
    address: {
        line1: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
}

export const login = async (data: loginData) => {
    const session = await getSession();

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_AIRPLANE_SERVICE_URL}/users/signin`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    let res = await response.json();

    if (response.ok) {
        res = res.data;
        session.username = res.userName;
        session.token = res.token;
        session.isLoggedIn = true;
        await session.save();
        redirect("/");
        return;
    }

    return {
        error: res.error.explanation ? res.error.explanation : res.message,
    };
};

export const register = async (data: registerData) => {
    const session = await getSession();

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_AIRPLANE_SERVICE_URL}/users/signup `,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const res = await response.json();

    console.log(res);

    console.log(res);
    if (response.ok) {
        session.username = res.data.userName;
        session.token = res.data.tocken;
        session.isLoggedIn = true;
        await session.save();
        redirect("/");
        return;
    }

    return {
        error: res.error.explanation ? res.error.explanation : res.message,
    };
};

export const logOut = async () => {
    const session = await getSession();
    session.destroy();
};
