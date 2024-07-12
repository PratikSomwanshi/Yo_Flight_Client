import React from "react";

function Divider({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-[1px] relative">
            <div className="h-full w-[80%] bg-slate-400 m-auto">{children}</div>
        </div>
    );
}

export default Divider;
