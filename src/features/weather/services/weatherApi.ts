import axios from "axios";
import { WeatherData, weatherParams, WeatherResponse } from "../types";


const url = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(latitude: number, longitude: number): Promise<WeatherResponse | void> {
    try {

        const Params : weatherParams = {
            latitude: latitude,
            longitude: longitude,
            daily: ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "uv_index_max", "precipitation_probability_max"],
            hourly: "temperature_2m",
            current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "wind_speed_10m", "cloud_cover"],
            timezone: "auto"
        };
        
        const response = await axios.get<WeatherData>(url, { params: Params, timeout: 10000 });
        
        return {
            status: response.status,
            weatherData: response.data
        };

    } catch (error: unknown) {
        if(axios.isAxiosError(error)) {
            return {
                status: error.response?.status || 500,
                weatherData: undefined
            };
        } else {
            return {
                status: 500,
                weatherData: undefined
            };
        }        
    }
}
