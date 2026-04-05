import WeatherCard from "../features/weather/components/WeatherCard";
import { RenderMap } from "../features/maps/components/RenderMap";
import { SearchLocationBox } from "../features/location/components/SearchLocationBox";

export default async function Home() {

  return (
    <div className="mx-4">
      <WeatherCard />
      <RenderMap />
      <SearchLocationBox />
    </div>
  );
}
