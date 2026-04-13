"use client"

import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { GetWeatherIcon } from "../hooks/useWeatherIcon";
import { useLocalTime } from "../hooks/useLocalTime";
import { useSelectedCity } from "../../location/hooks/useSelectedCity";

export default function WeatherCard() {
    const { GetIcon } = GetWeatherIcon();
    const { getSelectedCity } = useSelectedCity();
    const { localTime, isDaytime } = useLocalTime();
    const { data, isLoading, error } = useWeatherQuery();
    const isDay = localTime ? isDaytime(localTime) : false;
    const minTemperature = Math.min(...(data?.daily.temperature_2m_min || []));
    const maxTemperature = Math.max(...(data?.daily.temperature_2m_max || []));

    return (
        <div className="h-[40vh] w-full flex justify-center items-center flex-col">
            {isLoading && <p>Loading weather data...</p>}
            {error && <p>Error occurred while fetching weather data.</p>}
            {data && (() => {

                const Icon = GetIcon(data.current.cloud_cover,isDay);

                return (
                    <div className="grid grid-cols-2 max-h-[40vh]">
                        <Icon className="col-span-1 h-full w-30 flex items-right justify-center" />
                        <div className="col-span-1 flex flex-col items-left justify-center">
                            <h2 className="font-bold text-2xl">{getSelectedCity()?.name}</h2>
                            <p className="font-medium text-xl">{data.current.temperature_2m}°C</p>
                            <p className="font-medium text-lg">{minTemperature}°C - {maxTemperature}°C</p>
                        </div>
                    </div>
                );
            })()}

        </div>
    )
}