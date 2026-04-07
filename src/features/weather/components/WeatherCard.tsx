"use client"

import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { GetWeatherIcon } from "../hooks/useWeatherIcon";
import { useLocalTime } from "../hooks/useLocalTime";

export default function WeatherCard() {
    const { GetIcon } = GetWeatherIcon();
    const { data, isLoading, error } = useWeatherQuery();
    const { localTime, isDaytime } = useLocalTime();
    const isDay = localTime ? isDaytime(localTime) : false;

    return (
        <div className="h-[40vh] w-full flex justify-center items-center flex-col">
            {isLoading && <p>Loading weather data...</p>}
            {error && <p>Error occurred while fetching weather data.</p>}
            {data && (() => {

                const Icon = GetIcon(data.current.cloud_cover,isDay);

                return (
                    <div className="grid grid-cols-2 h-[40vh]">
                        <Icon className="col-span-1 h-full w-30 flex items-right justify-center" />
                        <div className="col-span-1 flex flex-col items-left justify-center">
                            <p>Temperature: {data.current.apparent_temperature}°C</p>
                            <p>Humidity: {data.current.relative_humidity_2m}%</p>
                            <p>Cloud cover: {data.current.cloud_cover}%</p>
                        </div>
                    </div>
                );
            })()}

        </div>
    )
}