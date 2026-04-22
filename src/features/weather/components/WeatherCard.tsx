"use client"

import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { GetWeatherIcon } from "../hooks/useWeatherIcon";
import { useLocalTime } from "../hooks/useLocalTime";
import { useSelectedCity } from "../../location/hooks/useSelectedCity";
import Skeleton from "react-loading-skeleton";


export default function WeatherCard() {
    const { GetIcon } = GetWeatherIcon();
    const { getSelectedCity } = useSelectedCity();
    const { localTime, isDaytime } = useLocalTime();
    const { data, isLoading, error } = useWeatherQuery();
    const isDay = localTime ? isDaytime(localTime) : false;
    const minTemperature = Math.min(...(data?.daily.temperature_2m_min || []));
    const maxTemperature = Math.max(...(data?.daily.temperature_2m_max || []));

    return (
        <div className="h-[40vh] w-[90vw] flex justify-center items-center flex-col
        lg:w-[60vw]
        ">
            {data && (() => {

                const Icon = GetIcon(data.current.cloud_cover,isDay);

                return (
                    <div className="grid grid-cols-2 max-h-[40vh]">
                        <Icon className="col-span-1 h-full w-30 flex items-right justify-center
                        md:w-40
                        " />
                        <div className="col-span-1 flex flex-col items-left justify-center">
                            <h2 className="font-bold text-2xl
                            md:text-4xl
                            ">{getSelectedCity()?.name}</h2>
                            <p className="font-medium text-xl 
                            md:text-2xl
                            ">{data.current.temperature_2m}°C</p>
                            <div className="font-medium text-lg flex
                            md:text-xl
                            "> <p className="font-bold">{maxTemperature}°C</p> - {minTemperature}°C</div>
                        </div>
                    </div>
                );
            })()}

            {isLoading && 
                <div className="w-full h-full rounded-lg grid grid-cols-2 items-center justify-center">
                    <div className="flex justify-center items-end">
                        <Skeleton circle height={70} width={70}/>
                    </div>
                    <div>
                        <Skeleton height={30} width={150} className="mb-2"/>
                        <Skeleton height={20} width={70} className="mb-2"/>
                        <Skeleton height={20} width={100} />
                    </div>
                </div>
            }

            {error && <p>Error occurred while fetching weather data.</p>}

        </div>
    )
}