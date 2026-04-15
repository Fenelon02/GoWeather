"use client";

import { ChangeEvent, useState } from "react";
import { RenderLocationsOptions } from "./RenderLocationsOptions";
import { useSearchGeocodingLocation } from "../hooks/useSearchGeocodingLocation";

export function SearchLocationBox() {
    
    const { setSeacrhCityGeocodingData} = useSearchGeocodingLocation();

    function searchGeogocodingData(e: ChangeEvent<HTMLInputElement>) {
        setSeacrhCityGeocodingData(e.target.value);
    }

    return (
        <div className="max-w-[90vw] min-w-[85vw]">
            <div className="bg-white/20 rounded-lg">
                <input className="
                p-2 
                focus:outline-none focus:ring-0 focus:border-none 
                hover:outline-none hover:ring-0 hover:border-none"
                type="text" placeholder="Rio de Janeiro" 
                onChange={searchGeogocodingData}/>
            </div>
            <RenderLocationsOptions/>
        </div>
    );
}