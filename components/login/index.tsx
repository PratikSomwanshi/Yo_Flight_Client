"use client";
import { login } from "@/utils/actions";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { set } from "date-fns";
import { LoaderCircle } from "lucide-react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = () => {
        // Clear error message when input changes
        setErrorMessage("");
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check if username or password is empty
        if (!username || !password) {
            setErrorMessage("Username and password are required.");
            return;
        }

        let res;
        try {
            setLoading(true);
            res = await login({ username, password });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorMessage("Failed to login. Please try again.");
        }

        if (res?.error) {
            setErrorMessage(res.error);
            return;
        }
    };

    return (
        <div className="w-screen h-[90vh] flex justify-center items-center rounded-md">
            <div className="bg-slate-100 w-full sm:w-[80%] md:w-[60%] lg:w-[30%] h-[20rem] px-3">
                <h1 className="mb-6 mt-4 underline text-lg text-center sm:text-end">
                    User Login
                </h1>
                <form onSubmit={handleSubmit} className="px-2">
                    <div className="space-y-1">
                        <label htmlFor="username">Username:</label>
                        <Input
                            type="text"
                            id="username"
                            className="bg-gray-200 w-full p-2 rounded"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="mb-5 mt-2 space-y-1">
                        <label htmlFor="password">Password:</label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            className="bg-gray-200 w-full p-2 rounded"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <button
                            type="submit"
                            className="w-full md:w-[70%] bg-green-500 p-2 rounded text-white hover:bg-green-600">
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <LoaderCircle className="animate-spin" />
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                    {errorMessage && (
                        <p className="text-red-400 mt-3 text-center">
                            {errorMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;
