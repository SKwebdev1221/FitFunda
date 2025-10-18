import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PublicAdvisory = () => {
  const [currentRiskIndex, setCurrentRiskIndex] = useState(0);
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);

  const healthRisks = [
    {
      id: 1,
      title: "Climate Change & Heatwaves",
      icon: "🌡️",
      date: "October 15, 2023",
      description:
        "Rising temperatures increase risks of heatstroke, dehydration, and cardiovascular issues.",
      risks: ["Heat exhaustion", "Respiratory problems", "Allergic reactions"],
    },
    {
      id: 2,
      title: "Air Pollution",
      icon: "🏭",
      date: "October 12, 2023",
      description:
        "Urban pollution from vehicles and industries affects lung health and overall well-being.",
      risks: ["Asthma attacks", "Heart disease", "Reduced lung function"],
    },
    {
      id: 3,
      title: "Diwali Fireworks Hazards",
      icon: "🎆",
      date: "October 10, 2023",
      description:
        "Festival celebrations can lead to injuries and respiratory issues from smoke and chemicals.",
      risks: ["Burn injuries", "Breathing difficulties", "Hearing loss"],
    },
    {
      id: 4,
      title: "Seasonal Flu Outbreak",
      icon: "🤒",
      date: "October 18, 2023",
      description:
        "Flu season increases the chances of viral infections and weakened immunity.",
      risks: ["Fever", "Sore throat", "Body ache"],
    },
  ];

  const specialists = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Pulmonologist",
      contact: "priya.sharma@fitfunda.com",
      expertise: "Respiratory health, Pollution-related conditions",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Cardiologist",
      contact: "rajesh.kumar@fitfunda.com",
      expertise: "Heart health, Climate-related cardiovascular issues",
      image:
        "https://randomuser.me/api/portraits/men/47.jpg",
    },
    {
      id: 3,
      name: "Dr. Meera Patel",
      specialty: "Environmental Health Specialist",
      contact: "meera.patel@fitfunda.com",
      expertise: "Climate change impacts, Preventive care",
      image:
        "https://randomuser.me/api/portraits/women/55.jpg",
    },
  ];

  const nextRisk = () =>
    setCurrentRiskIndex((prev) => (prev + 1) % healthRisks.length);
  const prevRisk = () =>
    setCurrentRiskIndex(
      (prev) => (prev - 1 + healthRisks.length) % healthRisks.length
    );

  const nextDoctor = () =>
    setCurrentDoctorIndex((prev) => (prev + 1) % specialists.length);
  const prevDoctor = () =>
    setCurrentDoctorIndex(
      (prev) => (prev - 1 + specialists.length) % specialists.length
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Public Health Advisory
          </h1>
          <p className="text-xl font-medium text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Stay informed about environmental and seasonal health risks. Take proactive steps to protect yourself and your loved ones.
          </p>
        </div>

        {/* Health Risks Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
            Current Health Risks
          </h2>

          <div className="flex justify-center items-center gap-6 overflow-x-auto pb-6">
            {healthRisks.map((risk, index) => {
              const isActive = index === currentRiskIndex;
              return (
                <motion.div
                  key={risk.id}
                  className={`relative bg-white rounded-3xl shadow-lg p-6 text-center flex-shrink-0 transition-all duration-500 ${
                    isActive ? "scale-105 ring-2 ring-[#00aef0]" : "scale-90 opacity-70"
                  }`}
                  style={{ width: "260px", minHeight: "320px" }}
                >
                  <div className="text-5xl mb-4">{risk.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {risk.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{risk.date}</p>
                  <p className="text-gray-700 text-base">
                    {risk.description}
                  </p>
                  <ul className="mt-4 text-sm text-gray-600 text-left">
                    {risk.risks.map((r, i) => (
                      <li key={i} className="flex items-center mb-1">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="text-center mt-8 flex flex-col items-center space-y-4">
            <div className="flex justify-center space-x-2">
              {healthRisks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentRiskIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentRiskIndex
                      ? "bg-[#00aef0] scale-125"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
                     </div>
        </section>

        {/* Doctors Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
            Recommended Health Specialists
          </h2>

          <div className="relative flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={prevDoctor}
              className="absolute left-0 z-10 bg-white rounded-full p-3 shadow-md hover:scale-105 transition-transform"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Doctor Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={specialists[currentDoctorIndex].id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl w-full mx-12 flex items-center gap-8 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-4 border-blue-100 shadow-md">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {specialists[currentDoctorIndex].name}
                  </h3>
                  <p className="text-lg text-blue-600 font-medium mb-2">
                    {specialists[currentDoctorIndex].specialty}
                  </p>
                  <p className="text-gray-700 mb-3">
                    {specialists[currentDoctorIndex].expertise}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Contact: {specialists[currentDoctorIndex].contact}
                  </p>
                  <button className="bg-[#00aef0] text-white px-6 py-2 rounded-lg hover:bg-[#0095c8] transition-transform font-semibold shadow-md hover:scale-105">
                    Schedule Consultation
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Arrow */}
            <button
              onClick={nextDoctor}
              className="absolute right-0 z-10 bg-white rounded-full p-3 shadow-md hover:scale-105 transition-transform"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {specialists.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDoctorIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentDoctorIndex
                    ? "bg-[#00aef0] scale-125"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Stay Healthy, Stay Informed</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Regular health check-ups and awareness are key to preventing health
            issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/patient/appointment-booking"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
            >
              Book Health Check-up
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg">
              Download Health Guide
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicAdvisory;
