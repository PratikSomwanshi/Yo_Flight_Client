import FlightBooking from "@/components/flightBooking";
import React from "react";

function SearchPage({ params: { id } }: { params: { id: string } }) {
    return (
        <div>
            <FlightBooking id={id} />
        </div>
    );
}

export default SearchPage;
