import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import PatientLoadIndicator from "../components/advisory/PatientLoadIndicator";
import HealthAdvisoryCard from "../components/advisory/HealthAdvisoryCard";
import EnvironmentalFactors from "../components/advisory/EnvironmentalFactors";
import ForecastChart from "../components/advisory/ForecastChart";
import { getCurrentAdvisory, getForecast } from "../api/publicAdvisory";

const PublicAdvisory = () => {
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [advisoryData, setAdvisoryData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const specialists = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Pulmonologist",
      contact: "priya.sharma@fitfunda.com",
      expertise: "Respiratory health, Pollution-related conditions",
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      specialty: "Cardiologist",
      contact: "rajesh.kumar@fitfunda.com",
      expertise: "Heart health, Climate-related cardiovascular issues",
    },
    {
      id: 3,
      name: "Dr. Meera Patel",
      specialty: "Environmental Health Specialist",
      contact: "meera.patel@fitfunda.com",
      expertise: "Climate change impacts, Preventive care",
    },
  ];

  useEffect(() => {
    fetchAdvisoryData();
  }, []);

  const fetchAdvisoryData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch current advisory and forecast in parallel
      const [currentData, forecastResponse] = await Promise.all([
        getCurrentAdvisory(),
        getForecast(7)
      ]);

      setAdvisoryData(currentData);
      setForecastData(forecastResponse);
    } catch (err) {
      console.error("Error fetching advisory data:", err);
      setError("Unable to load AI predictions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const nextDoctor = () =>
    setCurrentDoctorIndex((prev) => (prev + 1) % specialists.length);
  const prevDoctor = () =>
    setCurrentDoctorIndex(
      (prev) => (prev - 1 + specialists.length) % specialists.length
    );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600">Loading AI predictions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              AI-Powered Public Health Advisory
            </h1>
            <p className="text-xl font-medium text-gray-700 mx-auto leading-relaxed max-w-3xl">
              Real-time health predictions and environmental insights powered by machine learning
            </p>
            {advisoryData?.llm_reasoning && (
              <div className="mt-6 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <span>🤖</span> AI Analysis
                </h3>
                <p className="text-gray-700 leading-relaxed">{advisoryData.llm_reasoning}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 font-semibold">{error}</p>
            <button
              onClick={fetchAdvisoryData}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {advisoryData && (
          <>
            {/* Patient Load Indicator */}
            <section className="mb-12">
              <PatientLoadIndicator
                prediction={advisoryData.patient_load.prediction}
                loadLevel={advisoryData.patient_load.load_level}
                confidenceInterval={advisoryData.patient_load.confidence_interval}
              />
            </section>

            {/* Environmental Factors */}
            <section className="mb-12">
              <EnvironmentalFactors factors={advisoryData.environmental_factors} />
            </section>

            {/* Health Advisories */}
            {advisoryData.advisories && advisoryData.advisories.length > 0 && (
              <section className="mb-12">
                <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
                  Current Health Advisories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {advisoryData.advisories.map((advisory, index) => (
                    <HealthAdvisoryCard
                      key={index}
                      advisory={advisory}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Health Tips */}
            {advisoryData.health_tips && advisoryData.health_tips.length > 0 && (
              <section className="mb-12">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span>💡</span> Health Tips
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {advisoryData.health_tips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <span className="text-blue-600 font-bold text-lg">✓</span>
                        <p className="text-gray-700 text-sm">{tip}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        {/* 7-Day Forecast */}
        {forecastData && forecastData.forecast && (
          <section className="mb-12">
            <ForecastChart forecast={forecastData.forecast} />
          </section>
        )}

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
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
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
                className={`w-3 h-3 rounded-full transition-all ${index === currentDoctorIndex
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
            <button
              onClick={fetchAdvisoryData}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg"
            >
              Refresh Advisory
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicAdvisory;

