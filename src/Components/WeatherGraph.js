import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeatherGraph = ({ weatherData, temperatureUnit }) => {
    // modify the data and pass to the chart
    const data = weatherData.map(({ temp }) => {
        return {
            name: temp + temperatureUnit,
            temp: temp
        };
    })
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`Temp : ${label}`}</p>
                </div>
            );
        }

        return null;
    };
    return (
        <div style={{ width: '100%', height: 500 }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                <Tooltip content={<CustomTooltip />}/>
                    <Bar dataKey="temp" fill="#4caf50" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeatherGraph;
