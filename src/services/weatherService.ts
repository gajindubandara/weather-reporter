import axios from 'axios';
import type { WeatherData } from '../types/weather';

const BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

if (!API_KEY) {
    throw new Error('Missing environment variable: VITE_WEATHER_API_KEY');
}

// Fetch location weather data
export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
    try {
        const response = await axios.get<WeatherData>(`${BASE_URL}/current.json`, {
            params: {
                key: API_KEY,
                q: location,
                aqi: 'no',
            },
        });

        return response.data;
    } catch (error: any) {
        console.error('Error fetching weather data:', error.message);
        throw new Error('Failed to fetch weather data. Please try again later.');
    }
};