import FlightBooking from "@/components/flightBooking";
import { getSession } from "@/utils/actions";
import React from "react";

async function SearchPage({ params: { id } }: { params: { id: string } }) {
    const session = await getSession();

    if (!session.isLoggedIn) {
        return (
            <div className="w-full h-[90vh] flex justify-center items-center">
                <p className="text-center text-xl text-green-700">
                    You need to be logged in to book a flight
                </p>
            </div>
        );
    }

    return (
        <div>
            <FlightBooking id={id} />
        </div>
    );
}

export default SearchPage;
