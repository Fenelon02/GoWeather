"use client";
import { useMaps } from "../hooks/useMaps";

export function RenderMap() {
    useMaps();

    return (
        <div className="bg-white/20 rounded-lg p-2 my-4 min-w-full">
            <h2 className="text-white text-center">Cloud Coverage</h2>
            <div id="map" className="max-w-[90vw] min-w-[85vw] min-h-[40vh]"/>
        </div>
    );
}