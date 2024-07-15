"use client";
import { register } from "@/utils/actions"; // Ensure you implement this action
import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Select from "react-select";
import { set } from "date-fns";
import { LoaderCircle } from "lucide-react";

function Register() {
    const [loading, setLoading] = useState(false);
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

    const handleInputChangeErase = () => {
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

        console.log({
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

        let res;
        try {
            setLoading(true);
            res = await register({
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
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            if (error.message === "fetch failed") {
                setErrorMessage("Something went wrong. Please try again.");
            } else {
                setErrorMessage(error.message);
            }
        }

        if (res?.error) {
            setErrorMessage(res.error);
            return;
        }
    };
    type Country = {
        name: string;
        code: string;
    };

    const countries: Country[] = [{ name: "India", code: "in" }];

    const countryOptions = countries.map((country) => ({
        value: country.code,
        label: country.name,
    }));

    const [selectedCountry, setSelectedCountry] = useState<{
        value: string;
        label: string;
    } | null>(null);

    const handleChange = (
        selectedOption: { value: string; label: string } | null
    ) => {
        setSelectedCountry(selectedOption);
        setCountry(selectedOption?.value || "");
    };

    return (
        <div className="w-screen h-full mt-10 mb-10 flex justify-center items-center rounded-md">
            <div className="bg-slate-100 w-full sm:w-[80%] md:w-[60%] lg:w-[36%] py-10 h-[85%] px-3">
                <h1 className="mb-6 mt-4 underline text-lg text-center">
                    User Registration
                </h1>
                <form onSubmit={handleSubmit} className="px-2">
                    <div className="space-y-1">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="bg-gray-200 w-full p-2 rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-200 w-full p-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            className="bg-gray-200 w-full p-2 rounded"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-200 w-full p-2 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="bg-gray-200 w-full p-2 rounded"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="line1">Address Line 1:</label>
                        <input
                            type="text"
                            id="line1"
                            className="bg-gray-200 w-full p-2 rounded"
                            value={line1}
                            onChange={(e) => setLine1(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            className="bg-gray-200 w-full p-2 rounded"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            className="bg-gray-200 w-full p-2 rounded"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="postalCode">Postal Code:</label>
                        <input
                            type="text"
                            id="postalCode"
                            className="bg-gray-200 w-full p-2 rounded"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1 mt-2">
                        <label htmlFor="country">Country:</label>
                        <Select
                            id="country"
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={handleChange}
                            className="bg-gray-200 w-full p-2 rounded"
                            placeholder="Select Country"
                        />
                        {selectedCountry && (
                            <input
                                type="hidden"
                                value={selectedCountry.value}
                            />
                        )}
                    </div>
                    <div className="w-full flex justify-center items-center mt-6">
                        <button
                            type="submit"
                            className="w-full md:w-[70%] bg-green-500 p-2 rounded text-white hover:bg-green-600">
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <LoaderCircle className="animate-spin" />
                                </div>
                            ) : (
                                "Register"
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

export default Register;
