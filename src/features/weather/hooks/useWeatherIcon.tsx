import {
  Sun,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudLightning,
  CloudFog,
  Moon
} from 'lucide-react'
import { WeatherIconType } from '../types';

const weatherIcons: WeatherIconType = {
  clear: Sun,
  partlyCloudyDay: CloudSun,
  partlyCloudyNigth: CloudMoon,
  cloudy: Cloud,
  rain: CloudRain,
  storm: CloudLightning,
  fog: CloudFog,
  night: Moon,
};

export function GetWeatherIcon() {
    function GetIcon(condition: number, isDaytime: boolean) {
        if (condition <= 15 && isDaytime) {
            return weatherIcons.clear;
        } else if(condition <=15 && !isDaytime){
            return weatherIcons.night;
        }
        if (condition <= 30) {
            if(!isDaytime){
                return weatherIcons.partlyCloudyNigth;
            }
            return weatherIcons.partlyCloudyDay;
        }
        if (condition <= 60) {
            return weatherIcons.cloudy;
        }
        if (condition <= 80) {
            return weatherIcons.rain;
        }
        if (condition <= 90) {
            return weatherIcons.storm;
        }
        if (condition <= 100) {
            return weatherIcons.fog;
        }
        return weatherIcons.clear; 
    }

    return { GetIcon };
}