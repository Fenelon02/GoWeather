import WeatherCard from "../features/weather/components/WeatherCard";
import { SearchLocationBox } from "../features/location/components/SearchLocationBox";

export default async function Home() {
  
  return (
    <div>
      <WeatherCard/>
      <SearchLocationBox/>
    </div>
  );
}
