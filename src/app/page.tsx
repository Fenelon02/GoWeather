"use client";

import WeatherCard from "../features/weather/components/WeatherCard";
import { RenderMap } from "../features/maps/components/RenderMap";
import { SearchLocationBox } from "../features/location/components/SearchLocationBox";
import { useLocalTime } from "../features/weather/hooks/useLocalTime";
import { RenderTemperatureByHour } from "../features/weather/components/RenderTemperatureByHour";
import { RenderWeeklyTemperature } from "../features/weather/components/RenderWeeklyTemperature";
import { RenderCurrWeatherData } from "../features/weather/components/RenderCurrWeatherData";

export default function Home() {
  const { localTime, isDaytime } = useLocalTime();
  const isDaytimeState = localTime ? isDaytime(localTime) : false;

  return (
    <div className={`px-15 flex flex-col items-center justify-center 
      ${isDaytimeState ? 'bg-linear-to-b from-sky-300 to-yellow-200 text-black'
        : 'bg-linear-to-b from-blue-950 to-blue-700 text-white'} 
      min-h-screen max-w-screen py-15 gap-4`}>
      <WeatherCard />
      <RenderTemperatureByHour />
      <RenderCurrWeatherData/>
      <RenderMap />
      <RenderWeeklyTemperature />
      <SearchLocationBox />
    </div>
  );
}
