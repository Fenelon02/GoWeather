"use client"

import { useWeatherQuery } from "../hooks/useWeatherQuery";

export default function WeatherCard(){
    const { data, isLoading, error} = useWeatherQuery(); 

    return(
        <div className="h-[40vh] w-full flex justify-center items-center flex-col">
            <h1>Curr weather</h1>
            {isLoading && <p>Loading weather data...</p>}
            {error && <p>Error occurred while fetching weather data.</p>}
            {data &&
                <div>
                    <p>Temperature: {data.current.apparent_temperature}°C</p>
                    <p>Umidy: {data.current.relative_humidity_2m}%</p>
                </div>
            }
           
        </div>
    )
}