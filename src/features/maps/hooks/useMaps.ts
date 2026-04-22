import { useEffect, useRef, useState } from 'react';
import { getMapUrl } from '../services/MapApi';
import { useSelectedCity } from '../../location/hooks/useSelectedCity';
import 'leaflet/dist/leaflet.css';

const ZOOM = 7;
const MAX_ZOOM = 19;

export function useMaps() {
    const { getSelectedCity } = useSelectedCity();
    const selectedCity = getSelectedCity();
    const mapRef = useRef<L.Map | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function setMap() {

            if (!selectedCity || mapRef.current) return;

            setIsLoading(true);
            try {
                const L = (await import('leaflet')).default;

                const urlData = await getMapUrl();
                const path = urlData.data?.radar.past?.at(-1)?.path;
                const host = urlData.data?.host;

                const map = L.map('map').setView(
                    [selectedCity.latitude, selectedCity.longitude],
                    ZOOM
                );

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: MAX_ZOOM,
                    attribution: '© OpenStreetMap'
                }).addTo(map);

                if (host && path) {
                    L.tileLayer(`${host}${path}/256/{z}/{x}/{y}/2/1_0.png`, {
                        opacity: 0.8,
                        maxNativeZoom: ZOOM,
                        maxZoom: MAX_ZOOM,
                        attribution: '© RainViewer'
                    }).addTo(map);
                }

                mapRef.current = map;
            } finally{
                setIsLoading(false);
            }
        }

        setMap();

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, [selectedCity]);

    return { mapRef, isLoading }
}