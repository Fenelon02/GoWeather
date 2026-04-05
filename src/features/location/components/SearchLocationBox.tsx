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
        <div>
            <div>
                <input type="text" placeholder="Rio de Janeiro" onChange={searchGeogocodingData}/>
            </div>
            <RenderLocationsOptions/>
        </div>
    );
}