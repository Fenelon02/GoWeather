"use client";
import { useMaps } from "../hooks/useMaps";

export function RenderMap() {
    useMaps();

    return (
        <div className="bg-black border rounded-2xl p-2 m-4 max-w-fit">
            <h2 className="text-white text-center">Cloud Coverage</h2>
            <div id="map" style={{ height: '400px', width: '400px'}} />
        </div>
    );
}