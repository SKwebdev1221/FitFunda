import React from 'react';
import { motion } from 'framer-motion';

const HealthAdvisoryCard = ({ advisory, index }) => {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'LOW':
                return { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', badge: 'bg-green-500' };
            case 'MEDIUM':
                return { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', badge: 'bg-yellow-500' };
            case 'HIGH':
                return { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-500' };
            case 'CRITICAL':
                return { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-500' };
            default:
                return { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', badge: 'bg-gray-500' };
        }
    };

    const colors = getSeverityColor(advisory.severity);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${colors.bg} border-2 ${colors.border} rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300`}
        >
            <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-4xl flex-shrink-0">
                    {advisory.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{advisory.type.replace(/_/g, ' ')}</h3>
                        <span className={`${colors.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                            {advisory.severity}
                        </span>
                    </div>

                    <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                        {advisory.message}
                    </p>

                    <div className={`${colors.bg} border ${colors.border} rounded-lg p-3`}>
                        <h4 className={`${colors.text} font-semibold text-sm mb-1 flex items-center gap-2`}>
                            <span>✓</span> Recommendation
                        </h4>
                        <p className="text-gray-600 text-sm">
                            {advisory.recommendation}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HealthAdvisoryCard;
