import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCityGeocodingData } from "../services/LocationApi";
import { GeocodingData, GeocodingResponse } from "../types";
import { useDebounce } from "./userDebounce";


export function useSearchGeocodingLocation() {
    const queryClient = useQueryClient();

    function setSeacrhCityGeocodingData(city: string) {
        queryClient.setQueryData(["searchCityGeocoding"], city);
    }

    const {data: searchCityGeocoding} = useQuery<string>({
        queryKey: ["searchCityGeocoding"],
        queryFn: () => queryClient.getQueryData<string>(["searchCityGeocoding"]) as string,
        enabled: false,
        staleTime: Infinity,
    });
    
    const debouncedCityGeocoding = useDebounce(searchCityGeocoding, 800);


    const query =  useQuery<GeocodingData>({
        queryKey: ["geocodeLocation", debouncedCityGeocoding],
        queryFn: async () => {
            if(debouncedCityGeocoding) {
                const respose: GeocodingResponse = await getCityGeocodingData(debouncedCityGeocoding);
                if(respose.status === 200 && respose.geocodingData) {
                    return respose.geocodingData;
                }
            }
            throw new Error(`Failed to fetch geocoding data for: ${debouncedCityGeocoding}. `);
            
        },
        enabled: !!debouncedCityGeocoding && debouncedCityGeocoding.length > 3
    })
    return {...query, setSeacrhCityGeocodingData};
}