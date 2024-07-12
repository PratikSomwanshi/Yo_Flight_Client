// "use client";
// import React, { useState } from "react";
// import { Input } from "../ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Button } from "../ui/button";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Calendar } from "../ui/calendar";

// function Search() {
//     const [date, setDate] = useState<Date>();
//     return (
//         <div className="flex w-[70%] m-auto mt-10 space-x-4 justify-center items-end ">
//             <div className="flex-1">
//                 <label>Arrival City</label>
//                 <Input />
//             </div>
//             <div className="flex-1">
//                 <label>Departure City</label>
//                 <Input />
//             </div>
//             <div className="flex-1">
//                 <h2>Date</h2>
//                 <Popover>
//                     <PopoverTrigger asChild>
//                         <Button
//                             variant={"outline"}
//                             className={cn(
//                                 "w-[280px] justify-start text-left font-normal",
//                                 !date && "text-muted-foreground"
//                             )}>
//                             <CalendarIcon className="mr-2 h-4 w-4" />
//                             {date ? (
//                                 format(date, "PPP")
//                             ) : (
//                                 <span>Pick a date</span>
//                             )}
//                         </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0">
//                         <Calendar
//                             mode="single"
//                             selected={date}
//                             onSelect={setDate}
//                             initialFocus
//                         />
//                     </PopoverContent>
//                 </Popover>
//             </div>
//         </div>
//     );
// }

// export default Search;

"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import useTravelStore from "@/store";

function Search() {
    // const [date, setDate] = useState<Date>();
    const {
        date,
        setDate,
        arrivalCity,
        departureCity,
        setArrivalCity,
        setDepartureCity,
    } = useTravelStore();

    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = () => {
        // Clear error message when input changes
        setErrorMessage("");
    };

    return (
        <div className="flex flex-col md:flex-row w-[96%] sm:w-[80%] md:w-[70%]  m-auto mt-10 space-y-4 md:space-y-0 md:space-x-4 justify-center items-end">
            <div className="flex-1 w-full md:w-auto">
                <label>Arrival City</label>
                <Input
                    type="text"
                    id="arrivalCity"
                    value={arrivalCity}
                    onChange={(e) => {
                        setArrivalCity(e.target.value);
                        handleInputChange(); // Clear error message on input change
                    }}
                />
            </div>
            <div className="flex-1 w-full md:w-auto">
                <label>Departure City</label>
                <Input
                    type="text"
                    id="departureCity"
                    value={departureCity}
                    onChange={(e) => {
                        setDepartureCity(e.target.value);
                        handleInputChange(); // Clear error message on input change
                    }}
                />
            </div>
            <div className="flex-1 w-full md:w-auto">
                <h2>Date</h2>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                                format(date, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

export default Search;
