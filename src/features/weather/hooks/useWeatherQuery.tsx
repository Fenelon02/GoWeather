import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSelectedCity } from "../../location/hooks/useSelectedCity";
import { WeatherData } from "../types";
import { getWeather } from "../services/weatherApi";

export function useWeatherQuery() {
    const { getSelectedCity } = useSelectedCity();
    const queryClient = useQueryClient();
    const geocodeCityLocation = getSelectedCity()

    const query = useQuery <WeatherData>({
        queryKey: ["weather", geocodeCityLocation?.latitude, geocodeCityLocation?.longitude],
        queryFn: async () => {
            const response = await getWeather(geocodeCityLocation!.latitude, geocodeCityLocation!.longitude);
            if (response?.status === 200 && response.weatherData) {
                return response.weatherData;
            }
            throw new Error(
                `Status: ${response?.status ?? "unknown"}. Failed to fetch weather for: ${geocodeCityLocation?.name ?? "unknown city"}.`
            );
        },
        enabled: !!geocodeCityLocation?.latitude && !!geocodeCityLocation?.longitude,
        staleTime: 1000 * 60 * 60,
    });

    function setWeatherData(newWeather: WeatherData) {
        queryClient.setQueryData(["weather", geocodeCityLocation?.latitude, geocodeCityLocation?.longitude], newWeather);
    }

    return { ...query, setWeatherData};
}
