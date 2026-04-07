"use client";

import WeatherCard from "../features/weather/components/WeatherCard";
import { RenderMap } from "../features/maps/components/RenderMap";
import { SearchLocationBox } from "../features/location/components/SearchLocationBox";
import { useLocalTime } from "../features/weather/hooks/useLocalTime";

export default function Home() {
  const { localTime, isDaytime } = useLocalTime();
  const isDaytimeState = localTime ? isDaytime(localTime) : false;

  return (
    <div className={`px-4 py-8 flex flex-col items-center justify-center ${isDaytimeState ? 'bg-linear-to-b from-sky-300 to-bg-amber-100' : 'bg-linear-to-b from-blue-950 to-blue-700 text-white'} min-h-screen`}>
        <WeatherCard />
        <RenderMap />
        <SearchLocationBox />
    </div>
  );
}
