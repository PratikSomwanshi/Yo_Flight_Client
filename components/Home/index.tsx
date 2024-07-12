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
    const { arrivalCity, departureCity } = useTravelStore();
    const [error, setError] = useState(false);

    const query = useMutation({
        mutationKey: ["flights"],
        mutationFn: async () => {
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
                        className="bg-slate-400 hover:bg-slate-300 rounded-md absolute -top-5 left-[46%] w-32"
                        onClick={() => query.mutate()}>
                        Search
                    </Button>
                </Divider>
            </div>
            <div className="py-6">
                {query.isPending &&
                    Array(1)
                        .fill("")
                        .map((_, i) => (
                            <div
                                className="bg-slate-100 m-auto w-[60%] h-20 px-4 py-2 rounded-lg"
                                key={i}>
                                <div className="flex items-center justify-between h-full">
                                    <div className="flex flex-col justify-around h-full ">
                                        <Skeleton className="h-5 w-[250px] bg-slate-200 rounded-xl" />
                                        <div className="flex space-x-4">
                                            <Skeleton className="h-5 w-[250px] bg-slate-200 rounded-xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="flex items-center">
                                            <Skeleton className="h-5 w-[250px] bg-slate-200 rounded-xl" />
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
                {!query.isPending &&
                    !error &&
                    query.data?.data &&
                    query.data.data.map((flight: any) => (
                        <Link href={`/search/${flight.flightNumber}`}>
                            <div
                                className="bg-slate-100 m-auto w-[60%] h-20 px-4 py-2 rounded-lg"
                                key={flight.flightNumber}>
                                <div className="flex items-center justify-between h-full">
                                    <div className="flex flex-col justify-around h-full ">
                                        <h2>{flight.flightNumber}</h2>
                                        <div className="flex space-x-4">
                                            <h2 className="font-semibold">
                                                {flight.arrivalAirport.name}
                                            </h2>
                                            <MoveRight />
                                            <h2 className="font-semibold">
                                                {flight.departureAirport.name}
                                            </h2>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="flex items-center">
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
