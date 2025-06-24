import React, { useState, useEffect } from 'react';
import { getCurrentWeather } from '../services/weatherService';
import WeatherCard from '../components/WeatherCard';
import type { WeatherData } from '../types/weather';
import { Spin, Input, Button, notification, Empty, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const Home: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [locationInput, setLocationInput] = useState<string>('Colombo');
    
    const showErrorNotification = (message: string, description: string) => {
        notification.error({
            message,
            description,
            duration: 2,
            placement: 'top',
        });
    };

    // Fetch weather data
    const fetchWeather = async (location: string) => {
        setLoading(true);
        try {
            const data = await getCurrentWeather(location);
            setWeatherData(data);
        } catch (err: any) {
            setWeatherData(null);

            if (err.response?.data?.error?.code === 1006) {
                showErrorNotification('Location Not Found', 'Please enter a valid city name.');
            } else {
                showErrorNotification('Failed to Load Weather', 'An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchWeather('Colombo');
    }, []);


    const handleSearch = () => {
        if (!locationInput.trim()) return;
        fetchWeather(locationInput);
    };

    return (
        <div style={{ padding: 40, maxWidth: 700, margin: 'auto' }}>
            <div style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
                <Input
                    placeholder="Enter city name"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    style={{ flex: 1 }}
                    onPressEnter={handleSearch}
                />
                <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={handleSearch}
                    loading={loading}
                >
                    Search
                </Button>
            </div>


            {loading && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 100,
                }}>
                    <Spin size="default" tip="Fetching weather..." />
                </div>
            )}

            {!loading && (
                <>
                    {weatherData ? (
                        <WeatherCard data={weatherData} />
                    ) : (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 30,
                        }}>
                            <Empty
                                styles={{ image: { height: 60 } }}
                                description={
                                    <Typography.Text>
                                        No data available
                                    </Typography.Text>
                                }
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
