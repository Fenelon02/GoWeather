import { useMemo } from "react";
import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { useLocalTime } from "../hooks/useLocalTime";
import { DailyWeatherEntry } from "../types"
import { GetWeatherIcon } from "../hooks/useWeatherIcon";
import { Droplet } from "lucide-react"


export function RenderWeeklyTemperature(){
    const {data, isLoading, error} = useWeatherQuery();
    const { localTime, isDaytime } = useLocalTime();
    const { GetIcon } = GetWeatherIcon()
    const isDaytimeState = localTime ? isDaytime(localTime) : false;
    const weeklyTemp: DailyWeatherEntry[] = useMemo(() => {
        if(!data?.daily){
            return []
        }

        return data.daily.time.map((_, i) => ({
            time: data.daily.time[i],
            temperature_2m_max: data.daily.temperature_2m_max[i],
            temperature_2m_min: data.daily.temperature_2m_min[i],
            sunrise: data.daily.sunrise[i],
            sunset: data.daily.sunset[i],
            uv_index_max: data.daily.uv_index_max[i],
            precipitation_probability_max: data.daily.precipitation_probability_max[i]
        }))
    }, [data, localTime])
    
    return(
        <div className="bg-white/20 p-5 min-w-[85vw] max-w-[90vw] rounded-lg">
            {weeklyTemp.length > 0 && weeklyTemp && 
            <div className={` ${isDaytimeState ? "text-black" : "text-white"}`}>{
                weeklyTemp.map((item, index) => {
                    const Icon = GetIcon(item.precipitation_probability_max, true);

                    return(
                        <div key={index} className="grid grid-cols-3 pt-2 text-sm">
                            <div className="flex gap-1 min-w-fit">
                                <div>{item.time.slice(5)}</div>
                                <div className="flex">
                                    <p className="font-bold">{item.temperature_2m_max}°/</p>
                                    <p>{item.temperature_2m_min}°</p>
                                </div>
                            </div>
                            <div className="flex justify-center">
                               <Icon/> 
                            </div>
                            <div className="flex justify-end">
                                <Droplet />{item.precipitation_probability_max}%
                            </div>
                        </div>
                    )
                })
            }</div>}
            {isLoading && <div className={`${isDaytimeState ? "text-black" : "text-white"}`}>Loading Weekly Temperature</div>}
            {error && <div className={`${isDaytimeState ? "text-black" : "text-white"}`}>Error fetching data</div>}
        </div>
    )
}