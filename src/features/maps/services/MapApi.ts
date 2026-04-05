import axios from "axios";
import { ApiResponse, MapApiResponse } from "../types";

const API_BASE_URL = "https://api.rainviewer.com/public/weather-maps.json";

export async function getMapUrl() : Promise<ApiResponse<MapApiResponse>> {
    try {
        const response = await axios.get<MapApiResponse>(API_BASE_URL);
        return {
            status: response.status,
            data: response.data
        };
    } catch (error: unknown) {
        if(axios.isAxiosError(error)) {
            return {
                status: error.response?.status || 500,
                data: undefined
            };
        } else {
            return {
                status: 500,
                data: undefined 
            }
        };
    }
}
