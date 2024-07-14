"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

function SeatBooking({
    id,
    tocken,
}: {
    id: string;
    tocken: string | undefined;
}) {
    const flightId = id;

    const queryClient = useQueryClient();
    const [error, setError] = React.useState(false);
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["allSeats"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_AIRPLANE_SERVICE_URL}/seat/all/${flightId}`
            );
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await res.json();
            // console.log(data);
            return data;
        },
    });

    const mutation = useMutation({
        mutationKey: ["flights"],
        mutationFn: async (seatNumber: string) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_AIRPLANE_SERVICE_URL}/payment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: tocken ? tocken : "",
                    },
                    body: JSON.stringify({
                        seatNumber,
                        flightNumber: flightId,
                    }),
                }
            );
            if (!res.ok) {
                throw new Error("Failed to fetch flights");
            }
            setError(false);
            const data = await res.json();
            console.log(data);
            router.push(data.data.payment_link);
            // return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["allSeats"],
            });
        },
        onError: (error) => {
            console.error(error);
            setError(true);
        },
    });

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Something went wrong</p>;
    }

    const seatsByRow = 6;
    const seatsInRow = data.reduce((rows: any[], seat: any, index: number) => {
        const rowIndex = Math.floor(index / seatsByRow);
        if (!rows[rowIndex]) {
            rows[rowIndex] = [];
        }
        rows[rowIndex].push(seat);
        return rows;
    }, []);

    console.log(data);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Seat Booking</h1>
            <div className="overflow-auto">
                {seatsInRow.map((row: any, rowIndex: any) => (
                    <div key={rowIndex} className="flex justify-center mb-2">
                        {row.map((seat: any, seatIndex: number) => (
                            <div
                                key={seat._id}
                                className={`p-2 m-1 w-16 h-16 rounded-lg flex flex-col justify-center items-center ${
                                    seat.isBooked ? "bg-red-200" : "bg-gray-100"
                                }`}>
                                <div className="text-center">
                                    <h2 className="text-sm font-semibold">
                                        {seat.seatNumber}
                                    </h2>
                                    <p className="text-xs">
                                        {seat.isBooked ? "Booked" : "Available"}
                                    </p>
                                </div>
                                {!seat.isBooked && (
                                    <button
                                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-2 rounded"
                                        onClick={() =>
                                            mutation.mutate(seat.seatNumber)
                                        }
                                        disabled={mutation.isPending}>
                                        {mutation.isPending ? "..." : "Book"}
                                    </button>
                                )}
                            </div>
                        ))}
                        {/* Add a space for the aisle */}
                        {rowIndex % 2 === 1 && <div className="w-8 h-16"></div>}
                    </div>
                ))}
            </div>
            <div>
                {
                    <p className="text-center text-red-500">
                        {error && "Failed to book seat"}
                    </p>
                }
            </div>
        </div>
    );
}

export default SeatBooking;
