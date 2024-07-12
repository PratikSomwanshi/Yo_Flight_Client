import { create } from "zustand";

type TravelStore = {
    date: Date | undefined;
    arrivalCity: string;
    departureCity: string;
    setDate: (date: Date | undefined) => void;
    setArrivalCity: (city: string) => void;
    setDepartureCity: (city: string) => void;
};

const useTravelStore = create<TravelStore>((set) => ({
    date: undefined,
    arrivalCity: "",
    departureCity: "",
    setDate: (date: Date | undefined) => set(() => ({ date })),
    setArrivalCity: (city: string) => set(() => ({ arrivalCity: city })),
    setDepartureCity: (city: string) => set(() => ({ departureCity: city })),
}));

export default useTravelStore;
