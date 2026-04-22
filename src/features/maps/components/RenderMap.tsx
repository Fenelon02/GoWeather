"use client";
import { useLocalTime } from "../../weather/hooks/useLocalTime";
import { useMaps } from "../hooks/useMaps";


export function RenderMap() {
    useMaps();
    const {isDaytime, localTime} = useLocalTime()
    const isDaytimeState = localTime ? isDaytime(localTime) : false;

    return (
        <div className="
        bg-white/20 rounded-lg p-2 w-[90vw] 
        lg:w-full
        lg:h-full    
        lg:flex
        lg:flex-col
        ">
            <h2 className={`
                text-center ${isDaytimeState ? "  text-black" 
                : " text-white"} py-1 md:text-xl`}
            >Cloud Coverage</h2>
            <div id="map" className="
            max-w-[90vw] min-h-[40vh]
            lg:flex-1
            lg:min-h-0
            lg:w-full   
            "/>
        </div>
    );
}