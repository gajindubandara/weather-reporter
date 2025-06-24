import React from 'react';
import {
    Card,
    Typography,
    Row,
    Col,
    Divider,
    Statistic,
    Avatar,
    Flex,
} from 'antd';
import {
    BsSun,
    BsMoon,
    BsWind,
    BsDroplet,
    BsLightning,
    BsEye,
    BsSpeedometer,
    BsThermometerHalf,
} from 'react-icons/bs';

const { Title, Text } = Typography;

interface WeatherCardProps {
    data: {
        location: {
            name: string;
            localtime: string;
        };
        current: {
            temp_c: number;
            humidity: number;
            wind_kph: number;
            uv: number;
            feelslike_c: number;
            dewpoint_c: number;
            pressure_mb: number;
            vis_km: number;
            condition: {
                text: string;
                icon: string;
                code: number;
            };
        };
    };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    const { location, current } = data;
    const { name, localtime } = location;
    const {
        temp_c,
        humidity,
        wind_kph,
        uv,
        feelslike_c,
        dewpoint_c,
        pressure_mb,
        vis_km,
        condition,
    } = current;

    const isDay = condition.code < 1100;

    return (
        <Card
            title={
                <Flex align="center" justify="space-between" wrap="wrap" className="weather-card-header">
                    <Flex align="center" gap={8}>
                        {isDay ? <BsSun /> : <BsMoon />}
                        <span>Current Weather in {name}</span>
                    </Flex>
                    <Text type="secondary">{localtime}</Text>
                </Flex>
            }
            style={{ margin: 'auto', maxWidth: 700, borderRadius: 16 }}
        >
            <div style={{ textAlign: 'center' }}>
                <img
                    src={`https:${condition.icon}`}
                    alt={condition.text}
                    style={{ width: 64, height: 64, marginBottom: 16 }}
                />
                <Title level={2}>{temp_c}°C</Title>
                <Text strong style={{ fontSize: 18 }}>
                    {condition.text}
                </Text>

                <Divider />

                <Row gutter={[16, 16]} justify="center">
                    <Col xs={12} sm={8}>
                        <Statistic
                            title="Feels Like"
                            value={`${feelslike_c}°C`}
                            prefix={<Avatar icon={<BsThermometerHalf />} size="small" />}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Statistic
                            title="Humidity"
                            value={`${humidity}%`}
                            prefix={<Avatar icon={<BsDroplet />} size="small" />}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Statistic
                            title="Wind Speed"
                            value={`${wind_kph} km/h`}
                            prefix={<Avatar icon={<BsWind />} size="small" />}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Statistic
                            title="UV Index"
                            value={uv}
                            prefix={<Avatar icon={<BsLightning />} size="small" />}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Statistic
                            title="Dew Point"
                            value={`${dewpoint_c}°C`}
                            prefix={<Avatar icon={<BsDroplet />} size="small" />}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Statistic
                            title="Pressure"
                            value={`${pressure_mb} hPa`}
                            prefix={<Avatar icon={<BsSpeedometer />} size="small" />}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        <Statistic
                            title="Visibility"
                            value={`${vis_km} km`}
                            prefix={<Avatar icon={<BsEye />} size="small" />}
                        />
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default WeatherCard;
