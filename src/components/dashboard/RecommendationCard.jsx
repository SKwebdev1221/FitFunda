import React from 'react';
import { Link } from 'react-router-dom';

const RecommendationCard = ({ recommendation }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-2xl">💡</span>
        </div>
        <div className="ml-4 flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {recommendation.title}
          </h4>
          <p className="text-gray-600 mb-4">
            {recommendation.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Priority: <span className={`font-medium ${
                recommendation.priority === 'high' ? 'text-red-600' :
                recommendation.priority === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {recommendation.priority}
              </span>
            </div>
            {recommendation.action && (
              <Link to={recommendation.action === 'Implement Plan' ? '/management/staff' : '/inventory/orders'}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  {recommendation.action}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
