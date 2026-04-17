"use client"

import { useSelectedCity } from "../hooks/useSelectedCity";
import { useSearchGeocodingLocation } from "../hooks/useSearchGeocodingLocation";
import { useEffect } from "react";
import { Location } from "../types";
import Skeleton from "react-loading-skeleton";

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
                        <div key={index} className="
                        my-4 p-2 border border-white/40
                        rounded-lg bg-white/5 cursor-pointer 
                        hover:bg-white/20"
                        onClick={() => {
                                setSelectedCity(loc);
                                setSeacrhCityGeocodingData('')
                            }}>
                            <p>{loc.name} - {loc.country}</p>
                        </div>
                    ))}
                </div>
            )}
            {isLoading && <div className="text-center my-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="w-full my-4">
                        <Skeleton width="100%" className="h-10" />
                    </div>
                ))}
            </div>}
            {error && <p className="text-center my-4">Error: {error.message}</p>}
        </div>
    )
}