import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const PublicAdvisory = () => {
  const healthRisks = [
    {
      id: 1,
      title: 'Climate Change & Heatwaves',
      icon: '🌡️',
      description: 'Rising temperatures increase risks of heatstroke, dehydration, and cardiovascular issues.',
      risks: ['Heat exhaustion', 'Respiratory problems', 'Allergic reactions'],
      precautions: ['Stay hydrated', 'Avoid outdoor activities during peak heat', 'Wear light clothing']
    },
    {
      id: 2,
      title: 'Air Pollution',
      icon: '🏭',
      description: 'Urban pollution from vehicles and industries affects lung health and overall well-being.',
      risks: ['Asthma attacks', 'Heart disease', 'Reduced lung function'],
      precautions: ['Use masks in polluted areas', 'Monitor air quality index', 'Indoor air purification']
    },
    {
      id: 3,
      title: 'Diwali Fireworks Hazards',
      icon: '🎆',
      description: 'Festival celebrations can lead to injuries and respiratory issues from smoke and chemicals.',
      risks: ['Burn injuries', 'Breathing difficulties', 'Noise-induced hearing loss'],
      precautions: ['Safe distance from fireworks', 'Protective eyewear', 'Ventilate homes after celebrations']
    }
  ];

  const specialists = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialty: 'Pulmonologist',
      contact: 'priya.sharma@fitfunda.com',
      expertise: 'Respiratory health, Pollution-related conditions'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      contact: 'rajesh.kumar@fitfunda.com',
      expertise: 'Heart health, Climate-related cardiovascular issues'
    },
    {
      id: 3,
      name: 'Dr. Meera Patel',
      specialty: 'Environmental Health Specialist',
      contact: 'meera.patel@fitfunda.com',
      expertise: 'Climate change impacts, Preventive care'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full mx-auto px-4 py-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-sm font-bold text-gray-900 mb-2">Public Health Advisory</h1>
          <p className="text-xs text-gray-600 w-full mx-auto">
            Stay informed about environmental and seasonal health risks. Take proactive steps to protect yourself and your loved ones.
          </p>
        </div>

        {/* Health Risks Section */}
        <section className="mb-8">
          <h2 className="text-base font-semibold text-gray-800 mb-4 text-center">Current Health Risks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {healthRisks.map(risk => (
              <div key={risk.id} className="bg-white rounded-xl shadow-lg p-3 hover:shadow-xl transition-shadow duration-300">
                <div className="text-xl mb-2">{risk.icon}</div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{risk.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{risk.description}</p>

                <div className="mb-2">
                  <h4 className="font-medium text-red-600 mb-1 text-sm">Potential Risks:</h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {risk.risks.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-green-600 mb-1 text-sm">Precautions:</h4>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {risk.precautions.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Specialists Section */}
        <section className="mb-8">
          <h2 className="text-base font-semibold text-gray-800 mb-4 text-center">Affiliated Health Specialists</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {specialists.map(specialist => (
              <div key={specialist.id} className="bg-white rounded-xl shadow-lg p-3 hover:shadow-xl transition-shadow duration-300">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <span className="text-base">👨‍⚕️</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{specialist.name}</h3>
                <p className="text-xs text-blue-600 font-medium mb-1">{specialist.specialty}</p>
                <p className="text-xs text-gray-600 mb-1">{specialist.expertise}</p>
                <div className="text-xs text-gray-500">
                  <p>Contact: {specialist.contact}</p>
                </div>
                <button className="mt-2 w-full bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                  Schedule Consultation
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 p-4 text-white text-center">
          <h2 className="text-base font-bold mb-2">Stay Healthy, Stay Informed</h2>
          <p className="text-xs mb-3 opacity-90">
            Regular health check-ups and awareness are key to preventing health issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              to="/patient/appointment-booking"
              className="bg-white text-blue-600 px-3 py-1 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 justify-content-center"
            >
              Book Health Check-up
            </Link>
            <button className="border-2 border-white text-white px-3 py-1 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 text-sm">
              Download Health Guide
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicAdvisory;
