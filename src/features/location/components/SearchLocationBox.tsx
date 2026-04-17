"use client";

import { ChangeEvent } from "react";
import { RenderLocationsOptions } from "./RenderLocationsOptions";
import { useSearchGeocodingLocation } from "../hooks/useSearchGeocodingLocation";

export function SearchLocationBox() {
    
    const { setSeacrhCityGeocodingData} = useSearchGeocodingLocation();

    function searchGeogocodingData(e: ChangeEvent<HTMLInputElement>) {
        setSeacrhCityGeocodingData(e.target.value);
    }

    return (
        <div className="w-[90vw] min-w-[85vw]">
            <div className="bg-white/20 rounded-lg">
                <input className="
                p-2 rounded-lg bg-transparent w-full
                focus:outline-none focus:ring-0 focus:border-0 
                focus:shadow-lg 
                hover:outline-none hover:ring-0 hover:border-0 
                hover:shadow-lg"
                type="text" placeholder="Berlin" 
                onChange={searchGeogocodingData}/>
            </div>
            <RenderLocationsOptions/>
        </div>
    );
}