"use client"
import { useEffect, useState } from "react";
import { useSelectedCity } from "../../location/hooks/useSelectedCity";
import { format, toZonedTime  } from "date-fns-tz"; 

export function useLocalTime() {
    const { getSelectedCity } = useSelectedCity();
    const selectedCity = getSelectedCity();
    const [localTime, setLocalTime] = useState('');

    useEffect(() => {
        if (selectedCity?.timezone) {
            const date = new Date();
            const zoned = toZonedTime(date, selectedCity.timezone);
            setLocalTime(format(zoned, 'yyyy-MM-dd HH:mm', { timeZone: selectedCity.timezone }));
        }
    }, [selectedCity?.timezone]);

    function isDaytime(time: string): boolean {
        const hour = parseInt(time.split(':')[0], 10);
        return hour >= 6 && hour < 18;
    }

    return { localTime, isDaytime };
}
  