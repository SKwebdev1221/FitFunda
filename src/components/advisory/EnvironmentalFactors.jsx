import React from 'react';
import { motion } from 'framer-motion';

const EnvironmentalFactors = ({ factors }) => {
    const getAQIStatus = (aqi) => {
        if (aqi <= 50) return { label: 'Good', color: 'text-green-600', bg: 'bg-green-100' };
        if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
        if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: 'text-orange-600', bg: 'bg-orange-100' };
        if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-600', bg: 'bg-red-100' };
        if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-purple-600', bg: 'bg-purple-100' };
        return { label: 'Hazardous', color: 'text-red-800', bg: 'bg-red-200' };
    };

    const getTempStatus = (temp) => {
        if (temp < 10) return { icon: '❄️', label: 'Cold', color: 'text-blue-600' };
        if (temp < 25) return { icon: '🌤️', label: 'Pleasant', color: 'text-green-600' };
        if (temp < 35) return { icon: '☀️', label: 'Warm', color: 'text-orange-600' };
        return { icon: '🌡️', label: 'Hot', color: 'text-red-600' };
    };

    const getEpidemicStatus = (level) => {
        switch (level) {
            case 0: return { label: 'No Alert', color: 'text-green-600', bg: 'bg-green-100' };
            case 1: return { label: 'Level 1 - Monitor', color: 'text-yellow-600', bg: 'bg-yellow-100' };
            case 2: return { label: 'Level 2 - Caution', color: 'text-orange-600', bg: 'bg-orange-100' };
            case 3: return { label: 'Level 3 - Critical', color: 'text-red-600', bg: 'bg-red-100' };
            default: return { label: 'Unknown', color: 'text-gray-600', bg: 'bg-gray-100' };
        }
    };

    const aqiStatus = getAQIStatus(factors.AQI);
    const tempStatus = getTempStatus(factors.temp);
    const epidemicStatus = getEpidemicStatus(factors.epidemic_alert_level);

    const factorCards = [
        {
            title: 'Air Quality Index',
            value: factors.AQI,
            unit: 'AQI',
            icon: '🏭',
            status: aqiStatus.label,
            color: aqiStatus.color,
            bg: aqiStatus.bg
        },
        {
            title: 'Temperature',
            value: factors.temp,
            unit: '°C',
            icon: tempStatus.icon,
            status: tempStatus.label,
            color: tempStatus.color,
            bg: 'bg-blue-50'
        },
        {
            title: 'Rainfall',
            value: factors.rainfall,
            unit: 'mm',
            icon: factors.rainfall > 0 ? '🌧️' : '☀️',
            status: factors.rainfall > 0 ? 'Rainy' : 'Dry',
            color: factors.rainfall > 0 ? 'text-blue-600' : 'text-yellow-600',
            bg: factors.rainfall > 0 ? 'bg-blue-50' : 'bg-yellow-50'
        },
        {
            title: 'Epidemic Alert',
            value: factors.epidemic_alert_level,
            unit: '',
            icon: '🦠',
            status: epidemicStatus.label,
            color: epidemicStatus.color,
            bg: epidemicStatus.bg
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>🌍</span> Environmental Factors
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {factorCards.map((factor, index) => (
                    <motion.div
                        key={factor.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`${factor.bg} rounded-xl p-4 border-2 border-gray-200 hover:shadow-md transition-shadow duration-300`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-3xl">{factor.icon}</span>
                            <span className={`${factor.color} text-xs font-bold px-2 py-1 rounded-full bg-white`}>
                                {factor.status}
                            </span>
                        </div>

                        <h3 className="text-sm font-semibold text-gray-600 mb-1">{factor.title}</h3>

                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-800">{factor.value}</span>
                            {factor.unit && <span className="text-sm text-gray-600">{factor.unit}</span>}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                    <span className="font-semibold">ℹ️ Note:</span> Environmental factors are updated regularly and may affect hospital patient load and health risks.
                </p>
            </div>
        </div>
    );
};

export default EnvironmentalFactors;
