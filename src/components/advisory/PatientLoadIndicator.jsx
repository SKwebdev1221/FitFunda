import React from 'react';
import { motion } from 'framer-motion';

const PatientLoadIndicator = ({ prediction, loadLevel, confidenceInterval }) => {
    // Color mapping for load levels
    const getLoadColor = (level) => {
        switch (level) {
            case 'LOW':
                return { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700', gauge: 'from-green-400 to-green-600' };
            case 'NORMAL':
                return { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700', gauge: 'from-blue-400 to-blue-600' };
            case 'HIGH':
                return { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-700', gauge: 'from-orange-400 to-orange-600' };
            case 'CRITICAL':
                return { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700', gauge: 'from-red-400 to-red-600' };
            default:
                return { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-700', gauge: 'from-gray-400 to-gray-600' };
        }
    };

    const colors = getLoadColor(loadLevel);
    const percentage = Math.min((prediction / 600) * 100, 100); // Max 600 patients for gauge

    const getRecommendation = (level) => {
        switch (level) {
            case 'LOW':
                return 'Great time to visit for non-urgent care. Minimal wait times expected.';
            case 'NORMAL':
                return 'Normal patient volume. Standard wait times apply.';
            case 'HIGH':
                return 'High patient volume expected. Consider rescheduling non-urgent visits.';
            case 'CRITICAL':
                return 'Very high patient volume. Please visit only for emergencies.';
            default:
                return '';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-6 shadow-lg`}
        >
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Hospital Capacity</h3>
                    <p className="text-sm text-gray-600">AI-Predicted Patient Load</p>
                </div>
                <div className={`px-4 py-2 rounded-full ${colors.bg} ${colors.text} font-bold text-lg border-2 ${colors.border}`}>
                    {loadLevel}
                </div>
            </div>

            {/* Gauge Visualization */}
            <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-4xl font-bold text-gray-800">{Math.round(prediction)}</span>
                    <span className="text-lg text-gray-600">patients</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${colors.gauge} rounded-full flex items-center justify-end pr-2`}
                    >
                        <span className="text-white text-xs font-bold">{Math.round(percentage)}%</span>
                    </motion.div>
                </div>

                {/* Confidence Interval */}
                {confidenceInterval && (
                    <div className="mt-2 text-sm text-gray-600">
                        <span>Confidence Range: </span>
                        <span className="font-semibold">
                            {Math.round(confidenceInterval.lower)} - {Math.round(confidenceInterval.upper)} patients
                        </span>
                    </div>
                )}
            </div>

            {/* Recommendation */}
            <div className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
                <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                        <h4 className={`font-bold ${colors.text} mb-1`}>Recommendation</h4>
                        <p className="text-gray-700 text-sm">{getRecommendation(loadLevel)}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PatientLoadIndicator;
