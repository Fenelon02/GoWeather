export type WeatherResponse = {
    status: number;
    weatherData?: WeatherData;
}

export type WeatherData = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;

    current_units: currentUnits;
    current: currentWeather;

    hourly_units: hourlyUnits;
    hourly: hourlyWeather;

    daily_units: dailyUnits;
    daily: dailyWeather;
}

export type currentUnits ={
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    wind_speed_10m: string;
    cloud_cover: string;
    precipitation: string
    is_day: string
}

export type currentWeather = {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    cloud_cover: number;
    precipitation: number
    is_day: number
}

export type hourlyUnits = {
    time: string;
    temperature_2m: string;
    precipitation_probability: string
}

export type hourlyWeather = {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: string[]
}

export type dailyUnits = {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
    precipitation_probability_max: string;
}

export type dailyWeather = {
    time: string[];
    temperature_2m_max: number[]; 
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    precipitation_probability_max: number[];
}

export type weatherParams = {
    latitude: number;
    longitude: number;
    daily:  string | string[];
    hourly: string | string[];
    current: string | string[];
    timezone: string;
}

{/*the type of the icons*/}

export type WeatherIconType = { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> };

{/*the context data type*/}

export interface WeatherContextType {
    weatherData: WeatherData | undefined;
    setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | undefined>>;
    setDefaultWeatherData: () => Promise<void>;
}

export type WeatherProviderProps = {
    children: React.ReactNode;
}

{/* the weekly data response normalized */}
export type DailyWeatherEntry = {
    time: string;
    temperature_2m_max: number;
    temperature_2m_min: number;
    sunrise: string;
    sunset: string;
    uv_index_max: number;
    precipitation_probability_max: number;
}