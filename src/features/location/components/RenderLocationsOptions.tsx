"use client"

import { useSelectedCity } from "../hooks/useSelectedCity";
import { useSearchGeocodingLocation } from "../hooks/useSearchGeocodingLocation";
import { useEffect } from "react";
import { Location } from "../types";

export function RenderLocationsOptions() {
    const { setSelectedCity, getSelectedCity } = useSelectedCity();
    const { data: geocodingData, isLoading, error, setSeacrhCityGeocodingData } = useSearchGeocodingLocation();

    useEffect(() => {
        if(!getSelectedCity()) {
            const cityBuffer: Location =  {
                "id": 2950159,
                "name": "Berlin",
                "latitude": 52.52437,
                "longitude": 13.41053,
                "elevation": 74.0,
                "feature_code": "PPLC",
                "country_code": "DE",
                "admin1_id": 2950157,
                "admin2_id": 0,
                "admin3_id": 6547383,
                "admin4_id": 6547539,
                "timezone": "Europe/Berlin",
                "population": 3426354,
                "postcodes": [
                    "10967",
                    "13347"
                ],
                "country_id": 2921044,
                "country": "Deutschland",
                "admin1": "Berlin",
                "admin2": "",
                "admin3": "Berlin, Stadt",
                "admin4": "Berlin"
            }
            setSelectedCity(cityBuffer)
        }
    }, []);

    return (
        <div>
            {geocodingData?.results &&  (
                <div>
                    {geocodingData.results.map((loc, index) => (
                        <div key={index} className="m-4 border border-amber-950 max-w-[20vw] cursor-pointer " onClick={() => {
                                setSelectedCity(loc);
                                setSeacrhCityGeocodingData('')
                            }}>
                            <p>{loc.name} - {loc.country}</p>
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