import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { Umbrella, Wind } from "lucide-react";
import Skeleton from "react-loading-skeleton";

export function RenderCurrWeatherData() {
    const { data, isLoading, error } = useWeatherQuery();

    return (
        <div className="h-[20vh]">
            {data &&
                <div className="
                grid grid-cols-2
                w-[90vw] gap-4 min-h-full
                lg:w-[60vw]
                ">

                    <div className="flex justify-center items-center
                    bg-white/20 rounded-lg
                    text-2xl font-medium gap-2
                    md:text-4xl
                    ">
                        <Umbrella className="
                        w-15 h-15
                        md:w-20 md:h-20
                        " />
                        {data.daily.precipitation_probability_max[0] + "%"}
                    </div>

                    <div className="grid grid-rows-2 gap-4">
                        <div className="flex items-center
                         row-span-1 justify-center 
                        bg-white/20 rounded-lg
                        text-xl font-medium gap-2
                        md:text-3xl
                        ">
                            <p className="font-bold">Max UV:</p> {data.daily.uv_index_max[0]}
                        </div>
                        <div className="flex row-span-1 items-center
                         bg-white/20 rounded-lg
                         text-xl gap-2 font-medium
                         md:grid md:grid-cols-3
                         md:gap-0 md:text-3xl
                         ">
                            <Wind className="
                            h-15 w-15 
                            md:col-span-1
                            md:flex md:items-start 
                            md:justify-items-start
                            md:h-20 md:w-20
                            " />
                            <p className="
                            h-full w-ful flex items-center col-span-2
                            md:flex md:items-center
                            md:justify-start
                            ">{data.current.wind_speed_10m + " Km/h"}</p>
                        </div>
                    </div>
                </div>
            }

            {isLoading && <div className="
            grid grid-cols-2 h-[20vh]
            justify-center items-center
            w-[90vw] rounded-lg gap-4
            lg:w-[60vw]
            ">
                <div className="h-full w-full">
                    <Skeleton width="100%" height="100%" className="rounded-lg"/>
                </div>
                <div className="grid grid-rows-2 gap-4 w-full h-full">
                    <Skeleton width="100%" height="100%" className="rounded-lg"/>
                    <Skeleton width="100%" height="100%" className="rounded-lg"/>
                </div>
            </div>}

            {error && <div className="
            flex h-[20vh] justify-center items-center
            bg-white/20 w-[90vw] rounded-lg">
                Error occurred while fetching current weather data.</div>}
        </div>
    )
}