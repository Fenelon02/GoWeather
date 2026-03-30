import { useQuery ,useQueryClient } from "@tanstack/react-query";
import { Location } from "../types";

export function useSelectedCity() {
    const queryClient = useQueryClient();

    const { data: selectedCity } = useQuery<Location>({
        queryKey: ["selectedCity"],
        queryFn: () => queryClient.getQueryData<Location>(["selectedCity"]) as Location,
        enabled: false, 
        staleTime: Infinity,
    });

    function setSelectedCity(city: Location) {
        queryClient.setQueryData(["selectedCity"], city);
    }

    return { setSelectedCity, getSelectedCity: () => selectedCity };
}