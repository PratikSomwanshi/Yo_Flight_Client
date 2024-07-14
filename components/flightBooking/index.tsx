"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import PaymentBtn from "../paymetnButton";
import Link from "next/link";

function FlightBooking({ id }: { id: string }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["flightBooking", id],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_AIRPLANE_SERVICE_URL}/flight/single/${id}`
            );
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        },
    });

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Something went wrong</p>;
    }

    const flight = data.data;

    const formattedDepartureTime = format(
        new Date(flight.departureTime),
        "PPpp"
    );
    const formattedArrivalTime = format(new Date(flight.arrivalTime), "PPpp");

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{flight.flightNumber}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Arrival Airport:</h2>
                    <p className="text-lg">{flight.arrivalAirport.code}</p>
                    <p className="text-lg">{flight.arrivalAirport.name}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">
                        Departure Airport:
                    </h2>
                    <p className="text-lg">{flight.departureAirport.code}</p>
                    <p className="text-lg">{flight.departureAirport.name}</p>
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-semibold">Departure Time:</h2>
                <p className="text-lg">{formattedDepartureTime}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-xl font-semibold">Arrival Time:</h2>
                <p className="text-lg">{formattedArrivalTime}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Price:</h2>
                <p className="text-lg">{flight.amount}</p>
            </div>
            <div className="flex justify-center mt-6 h-12">
                <div className="flex-1">
                    <Link href={`/book/${id}`}>
                        <PaymentBtn />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FlightBooking;
