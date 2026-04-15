"use client"
import { useMemo } from "react";
import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { useLocalTime } from "../hooks/useLocalTime";
import { GetWeatherIcon } from "../hooks/useWeatherIcon";

export function RenderTemperatureByHour() {
    const {data, isLoading, error} = useWeatherQuery();
    const { localTime, isDaytime } = useLocalTime();
    const { GetIcon } = GetWeatherIcon();
    const hourlyTemp = useMemo(() => {
        if (!data?.hourly) {
            return [];
        }

        const currHour = new Date(localTime)
        const next24h = new Date(currHour.getTime() + 24 * 60 * 60 * 1000)

        return data.hourly.time
        .map((date, i) => ({date, temperature: data.hourly.temperature_2m[i], precipitation_probability: parseInt(data.hourly.precipitation_probability[i])}))
        .filter( i => new Date(i.date) >= currHour && new Date(i.date) <= next24h)

    }, [data, localTime]);

    return (
        <div className="flex overflow-y-scroll max-w-[90vw] min-w-[80vw] max-h-[25vh] bg-white/20 p-4 rounded-lg">
            <div className="flex">
                {hourlyTemp.length > 0 && hourlyTemp.map((temp, index) => {
                    
                    const Icon = GetIcon(temp.precipitation_probability, (isDaytime(temp.date)));

                    return (
                        <div key={index} className="p-2 mx-2">
                            {temp.date.slice(11,16)}
                            <Icon/> 
                            {temp.temperature}°C
                        </div>
                    )
                })}
            </div>
            {isLoading && <p>Loading hourly temperature data...</p>}
            {error && <p>Error occurred while fetching hourly temperature data.</p>}
        </div>
    )
}