"use client";
import { useLocalTime } from "../../weather/hooks/useLocalTime";
import { useMaps } from "../hooks/useMaps";


export function RenderMap() {
    useMaps();
    const {isDaytime, localTime} = useLocalTime()
    const isDaytimeState = localTime ? isDaytime(localTime.slice(10,19)) : false;

    return (
        <div className="bg-white/20 rounded-lg p-2 my-4 min-w-full">
            <h2 className={`text-center ${isDaytimeState ? "  text-black" : " text-white"} py-1`}>Cloud Coverage</h2>
            <div id="map" className="max-w-[90vw] min-w-[85vw] min-h-[40vh]"/>
        </div>
    );
}