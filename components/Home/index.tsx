"use client";
import React, { useState } from "react";
import Search from "../search";
import Divider from "../divider";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { IndianRupee, MoveRight } from "lucide-react";
import useTravelStore from "@/store";
import Link from "next/link";

function Home() {
    const { arrivalCity, departureCity, date } = useTravelStore();
    const [error, setError] = useState(false);
    const [dateError, setDateError] = useState("");

    const query = useMutation({
        mutationKey: ["flights"],
        mutationFn: async () => {
            if (!date) {
                setDateError("Please select a date");
                console.log("date is null");
                return;
            }

            setDateError("");

            console.log("a" + arrivalCity, departureCity);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_AIRPLANE_SERVICE_URL}/flight/city?arrivalAirport=${arrivalCity}&departureAirport=${departureCity}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!res.ok) {
                throw new Error("Failed to fetch flights");
            }
            setError(false);
            return res.json();
        },
        onError: (error) => {
            console.error(error);
            setError(true);
        },
    });

    return (
        <>
            <Search />
            <div className="mt-16 mb-10">
                <Divider>
                    <Button
                        className="bg-slate-400 hover:bg-slate-300 rounded-md absolute -top-5 left-1/2 transform -translate-x-1/2 w-32"
                        onClick={() => query.mutate()}>
                        Search
                    </Button>
                </Divider>
            </div>
            <div className="py-6">
                {query.isPending &&
                    Array(5)
                        .fill("")
                        .map((_, i) => (
                            <div
                                className="bg-slate-100 mx-auto w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-20 px-4 py-2 rounded-lg mb-4"
                                key={i}>
                                <div className="flex flex-col sm:flex-row items-center justify-between h-full">
                                    <div className="flex flex-col justify-around h-full w-full sm:w-auto">
                                        <Skeleton className="h-5 w-full sm:w-[250px] bg-slate-200 rounded-xl mb-2 sm:mb-0" />
                                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                            <Skeleton className="h-5 w-full sm:w-[250px] bg-slate-200 rounded-xl" />
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-0 w-full sm:w-auto">
                                        <h2 className="flex items-center">
                                            <Skeleton className="h-5 w-full sm:w-[250px] bg-slate-200 rounded-xl" />
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                {!query.isPending && error && (
                    <div className="text-center text-red-500">
                        No flight found
                    </div>
                )}
                {dateError && (
                    <div>
                        <p className="text-center text-red-500">{dateError}</p>
                    </div>
                )}
                {!query.isPending &&
                    !error &&
                    query.data?.data &&
                    query.data.data.map((flight: any) => (
                        <Link
                            href={`/search/${flight.flightNumber}`}
                            key={flight.flightNumber}>
                            <div className="bg-slate-100 mx-auto w-[96%] m-auto  sm:w-[80%] md:w-[60%] lg:w-[50%] h-auto p-4 rounded-lg mb-4">
                                <div className="flex flex-col sm:flex-row items-center justify-between h-full">
                                    <div className="flex flex-col justify-around h-full w-full sm:w-auto">
                                        <h2 className="text-lg sm:text-base">
                                            {flight.flightNumber}
                                        </h2>
                                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                                            <h2 className="font-semibold text-sm sm:text-base">
                                                {flight.arrivalAirport.name}
                                            </h2>
                                            <MoveRight />
                                            <h2 className="font-semibold text-sm sm:text-base">
                                                {flight.departureAirport.name}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="mt-4 sm:mt-0 w-full sm:w-auto">
                                        <h2 className="flex items-center text-sm sm:text-base">
                                            <IndianRupee size={14} />
                                            {flight.amount}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </>
    );
}

export default Home;
