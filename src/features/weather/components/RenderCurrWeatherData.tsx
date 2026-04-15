import { useWeatherQuery } from "../hooks/useWeatherQuery";
import { Umbrella, Wind } from "lucide-react";

export function RenderCurrWeatherData(){
    const { data,isLoading, error } = useWeatherQuery();

    return(
        <div className="h-[20vh]">
            {data && 
                <div className="grid grid-cols-2
                w-[90vw] gap-4 gap-y-4 min-h-[20vh]">
                    <div className="flex justify-center items-center
                    bg-white/20 rounded-lg
                    text-2xl font-medium gap-2
                    ">
                        <Umbrella className="w-15 h-15"/>
                        {data.daily.precipitation_probability_max[0] + "%"}
                    </div>
                    <div className="grid grid-rows-2 gap-4">
                        <div className="flex items-center
                         row-span-1 justify-center 
                        bg-white/20 rounded-lg
                        text-xl font-medium gap-2
                        ">
                            <p className="font-bold">Max UV:</p> {data.daily.uv_index_max[0]}
                        </div>
                        <div className="flex row-span-1 items-center
                         bg-white/20 rounded-lg
                         text-xl gap-2 font-medium
                         ">
                            <Wind className="h-15 w-15"/>
                            {data.current.wind_speed_10m + " Km/h"}
                        </div>
                    </div>
                </div>
            }

            {isLoading && <div className="
            flex h-[20vh] justify-center items-center
          bg-white/20 w-[90vw] rounded-lg">Loading current weather data...</div>}
            {error && <div className="
            flex h-[20vh] justify-center items-center
            bg-white/20 w-[90vw] rounded-lg">Error occurred while fetching current weather data.</div>}
        </div>
    )
}