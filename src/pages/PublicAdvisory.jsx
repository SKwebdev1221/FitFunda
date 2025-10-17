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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Public Health Advisory</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about environmental and seasonal health risks. Take proactive steps to protect yourself and your loved ones.
          </p>
        </div>

        {/* Health Risks Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Current Health Risks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthRisks.map(risk => (
              <div key={risk.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{risk.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{risk.title}</h3>
                <p className="text-gray-600 mb-4">{risk.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-red-600 mb-2">Potential Risks:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {risk.risks.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-green-600 mb-2">Precautions:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {risk.precautions.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
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
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Affiliated Health Specialists</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialists.map(specialist => (
              <div key={specialist.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{specialist.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{specialist.specialty}</p>
                <p className="text-gray-600 text-sm mb-3">{specialist.expertise}</p>
                <div className="text-sm text-gray-500">
                  <p>Contact: {specialist.contact}</p>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Schedule Consultation
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Healthy, Stay Informed</h2>
          <p className="text-xl mb-6 opacity-90">
            Regular health check-ups and awareness are key to preventing health issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/patient/appointment-booking"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Book Health Check-up
            </Link>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Download Health Guide
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicAdvisory;
