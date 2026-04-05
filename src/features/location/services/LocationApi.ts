import axios from "axios";
import { GeocodingData, GeocodingResponse } from "../types";

export async function getCityGeocodingData(city: string): Promise<GeocodingResponse> {
    try {
        const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=en&format=json`;
        const response = await axios.get<GeocodingData>(geocodingUrl, {timeout: 10000});
       
        return {
            status: response.status,
            geocodingData: response.data
        };

        
    } catch (error: unknown) {
        if(axios.isAxiosError(error)) {
            return {
                status: error.response?.status || 500,
                geocodingData: undefined
            };
        } else {
            return {
                status: 500,
                geocodingData: undefined
            };
        }        
    }
}