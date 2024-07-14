import React from "react";
import { Button } from "../ui/button";

function PaymentBtn() {
    return (
        <div>
            <Button className="bg-green-500 hover:bg-green-700 h-full  flex-1 text-white font-bold py-2 px-4 rounded">
                Book Seat
            </Button>
        </div>
    );
}

export default PaymentBtn;
