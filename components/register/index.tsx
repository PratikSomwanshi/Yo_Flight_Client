"use client";
import { register } from "@/utils/actions"; // Ensure you implement this action
import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [line1, setLine1] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = () => {
        setErrorMessage("");
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (
            !username ||
            !email ||
            !fullName ||
            !password ||
            !confirmPassword ||
            !line1 ||
            !city ||
            !state ||
            !postalCode ||
            !country
        ) {
            setErrorMessage("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const res = await register({
                username,
                email,
                fullName,
                password,
                address: {
                    line1,
                    city,
                    state,
                    postalCode,
                    country,
                },
            });

            if (res?.error) {
                setErrorMessage(res.error);
                return;
            }

            // Handle successful registration (e.g., redirect to login page)
        } catch (error: any) {
            if (error.message === "fetch failed") {
                setErrorMessage("Something went wrong. Please try again.");
            } else {
                setErrorMessage(error.message);
            }
        }
    };

    return (
        <div className="w-screen h-full mt-10 mb-10  flex justify-center items-center rounded-md">
            <div className="bg-slate-100 w-[36%] py-10 h-[85%] px-3">
                <h1 className="mb-6 mt-4 underline text-lg text-center">
                    User Registration
                </h1>
                <form onSubmit={handleSubmit} className="px-2">
                    <div className="space-y-1">
                        <label htmlFor="username">Username:</label>
                        <Input
                            type="text"
                            id="username"
                            className="bg-gray-200"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="email">Email:</label>
                        <Input
                            type="email"
                            id="email"
                            className="bg-gray-200"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="fullName">Full Name:</label>
                        <Input
                            type="text"
                            id="fullName"
                            className="bg-gray-200"
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="password">Password:</label>
                        <Input
                            type="password"
                            id="password"
                            className="bg-gray-200"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            className="bg-gray-200"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="line1">Address Line 1:</label>
                        <Input
                            type="text"
                            id="line1"
                            className="bg-gray-200"
                            value={line1}
                            onChange={(e) => {
                                setLine1(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="city">City:</label>
                        <Input
                            type="text"
                            id="city"
                            className="bg-gray-200"
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="state">State:</label>
                        <Input
                            type="text"
                            id="state"
                            className="bg-gray-200"
                            value={state}
                            onChange={(e) => {
                                setState(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="postalCode">Postal Code:</label>
                        <Input
                            type="text"
                            id="postalCode"
                            className="bg-gray-200"
                            value={postalCode}
                            onChange={(e) => {
                                setPostalCode(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="country">Country:</label>
                        <Input
                            type="text"
                            id="country"
                            className="bg-gray-200"
                            value={country}
                            onChange={(e) => {
                                setCountry(e.target.value);
                                handleInputChange();
                            }}
                        />
                    </div>
                    <div className="w-full flex justify-center items-center mt-6">
                        <Button type="submit" className="w-[70%] bg-green-500">
                            Register
                        </Button>
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

export default Register;
