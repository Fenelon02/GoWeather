"use client"

import { useSelectedCity } from "../hooks/useSelectedCity";
import { useSearchGeocodingLocation } from "../hooks/useSearchGeocodingLocation";

export function RenderLocationsOptions() {
    const { setSelectedCity, getSelectedCity } = useSelectedCity();
    const { data: geocodingData, isLoading, error } = useSearchGeocodingLocation();

    return (
        <div>
            {geocodingData && geocodingData.results.length > 0 && (
                <div>
                    {geocodingData.results.map((loc, index) => (
                        <div key={index} className="m-4 border border-amber-950 max-w-[20vw] cursor-pointer " onClick={() => setSelectedCity(loc)}>
                            <p>{loc.name}, {loc.country}</p>
                        </div>
                    ))}
                </div>
            )}
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {getSelectedCity() && (
                <div>
                    <h2>Selected City:</h2>
                    <p>{getSelectedCity()?.name}, {getSelectedCity()?.country}</p>
                </div>
            )}
        </div>
    )
}