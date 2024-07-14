"use client";
import React, { FormEvent, useState } from "react";
import Select from "react-select";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import useTravelStore from "@/store";

function Search() {
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

    // Mock data for airports and cities (replace with actual data)
    const options = [
        { value: "BLR", label: "Bengaluru (BLR)" },
        { value: "IXU", label: "Aurangabad (IXU)" },
        // Add more options as needed
    ];

    type CityOption = {
        value: string;
        label: string;
    };

    type CustomFilterFunction = (option: CityOption, query: string) => boolean;

    // Custom filter function for react-select to filter by label
    const customFilter: CustomFilterFunction = (option, query) =>
        option.label.toLowerCase().includes(query.toLowerCase());

    // Options for departure city dropdown, filtered to exclude selected arrival city
    const departureOptions = options.filter(
        (option) => option.value !== arrivalCity
    );

    // Options for arrival city dropdown, filtered to exclude selected departure city
    const arrivalOptions = options.filter(
        (option) => option.value !== departureCity
    );

    const handleDepartureCityChange = (selectedOption: any) => {
        if (selectedOption) {
            setDepartureCity(selectedOption.value);
        } else {
            setDepartureCity("");
        }
        handleInputChange(); // Clear error message on input change
    };

    const handleArrivalCityChange = (selectedOption: any) => {
        if (selectedOption) {
            setArrivalCity(selectedOption.value);
        } else {
            setArrivalCity("");
        }
        handleInputChange(); // Clear error message on input change
    };

    return (
        <div className="flex flex-col md:flex-row w-[96%] sm:w-[80%] md:w-[70%] m-auto mt-10 space-y-4 md:space-y-0 md:space-x-4 justify-center items-end">
            <div className="flex-1 w-full md:w-auto">
                <label htmlFor="arrivalCity">Arrival City</label>
                <Select
                    id="arrivalCity"
                    options={arrivalOptions}
                    value={arrivalOptions.find(
                        (option) => option.value === arrivalCity
                    )}
                    onChange={handleArrivalCityChange}
                    placeholder="Select Arrival City"
                    isClearable
                    filterOption={customFilter}
                    required
                />
            </div>
            <div className="flex-1 w-full md:w-auto">
                <label htmlFor="departureCity">Departure City</label>
                <Select
                    id="departureCity"
                    options={departureOptions}
                    value={departureOptions.find(
                        (option) => option.value === departureCity
                    )}
                    onChange={handleDepartureCityChange}
                    placeholder="Select Departure City"
                    isClearable
                    filterOption={customFilter}
                    required
                />
            </div>

            <div className="flex-1 w-full md:w-auto">
                <label htmlFor="searchDate">Date</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="searchDate"
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                                format(date, "PPP")
                            ) : (
                                <span>Select a date</span>
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
