import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const ForecastChart = ({ forecast }) => {
    if (!forecast || forecast.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <p className="text-gray-500 text-center">No forecast data available</p>
            </div>
        );
    }

    // Prepare data for chart
    const chartData = forecast.map(day => ({
        date: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        patients: Math.round(day.predicted_patients),
        aqi: day.aqi,
        temp: day.temp,
        loadLevel: day.load_level
    }));

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-blue-200">
                    <p className="font-bold text-gray-800 mb-2">{data.date}</p>
                    <div className="space-y-1 text-sm">
                        <p className="text-blue-600">
                            <span className="font-semibold">Patients:</span> {data.patients}
                        </p>
                        <p className="text-orange-600">
                            <span className="font-semibold">AQI:</span> {data.aqi}
                        </p>
                        <p className="text-green-600">
                            <span className="font-semibold">Temp:</span> {data.temp}°C
                        </p>
                        <p className={`font-bold ${data.loadLevel === 'CRITICAL' ? 'text-red-600' :
                                data.loadLevel === 'HIGH' ? 'text-orange-600' :
                                    data.loadLevel === 'NORMAL' ? 'text-blue-600' : 'text-green-600'
                            }`}>
                            Load: {data.loadLevel}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>📊</span> 7-Day Patient Load Forecast
            </h2>

            {/* Chart */}
            <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            stroke="#6b7280"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            style={{ fontSize: '12px' }}
                            label={{ value: 'Patients', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="patients"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorPatients)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Forecast Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Peak Day */}
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-red-700 mb-2">📈 Peak Day</h3>
                    <p className="text-2xl font-bold text-red-600">
                        {chartData.reduce((max, day) => day.patients > max.patients ? day : max).date}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        {Math.max(...chartData.map(d => d.patients))} patients expected
                    </p>
                </div>

                {/* Lowest Day */}
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-green-700 mb-2">📉 Lowest Day</h3>
                    <p className="text-2xl font-bold text-green-600">
                        {chartData.reduce((min, day) => day.patients < min.patients ? day : min).date}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        {Math.min(...chartData.map(d => d.patients))} patients expected
                    </p>
                </div>

                {/* Average */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-blue-700 mb-2">📊 Average</h3>
                    <p className="text-2xl font-bold text-blue-600">
                        {Math.round(chartData.reduce((sum, day) => sum + day.patients, 0) / chartData.length)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        patients per day
                    </p>
                </div>
            </div>

            {/* Trend Indicator */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                    <span className="font-semibold">Trend:</span>{' '}
                    {chartData[chartData.length - 1].patients > chartData[0].patients ? (
                        <span className="text-red-600 font-bold">↗ Increasing</span>
                    ) : (
                        <span className="text-green-600 font-bold">↘ Decreasing</span>
                    )}
                </p>
            </div>
        </motion.div>
    );
};

export default ForecastChart;
