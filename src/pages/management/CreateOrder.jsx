import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const CreateOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item: '',
    supplier: '',
    quantity: '',
    unit: '',
    urgency: 'Medium',
    expectedDelivery: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const suppliers = [
    'MedSupply Inc.',
    'PharmaCorp',
    'HealthCare Plus',
    'MedTech Solutions',
    'Global Medical Supplies',
    'BioPharm Distributors'
  ];

  const units = [
    'pieces',
    'pairs',
    'units',
    'boxes',
    'packs',
    'bottles',
    'vials',
    'pens'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/management');
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-xl text-center border-2 border-green-200"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-6xl mb-4"
            >
              ✅
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Created Successfully!</h2>
            <p className="text-gray-600 mb-4">Your supply order has been submitted for approval.</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <Navbar />
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h1 className="c h-font text-4xl font-bold text-gray-900 mb-2">Create New Supply Order</h1>
            <p className="w c text-lg text-gray-600">Streamline your medical supply procurement process</p>
            <div className="mt-4 flex justify-center">
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                <span className="text-2xl">📋</span>
                <span className="text-sm font-medium text-blue-700">Order Management System</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Item Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="mr-2">📦</span>
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="item"
                    value={formData.item}
                    onChange={handleInputChange}
                    placeholder="e.g., Surgical Gloves - Size M"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </motion.div>

                {/* Supplier */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="mr-2">🏢</span>
                    Supplier *
                  </label>
                  <select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 bg-white"
                    required
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map(supplier => (
                      <option key={supplier} value={supplier}>{supplier}</option>
                    ))}
                  </select>
                </motion.div>

                {/* Quantity & Unit */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <span className="mr-2">🔢</span>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="1000"
                      min="1"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <span className="mr-2">📏</span>
                      Unit *
                    </label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 bg-white"
                      required
                    >
                      <option value="">Select Unit</option>
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Urgency */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="mr-2">⚡</span>
                    Urgency Level *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Low', 'Medium', 'High'].map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, urgency: level }))}
                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          formData.urgency === level
                            ? level === 'High'
                              ? 'bg-red-500 text-white shadow-lg transform scale-105'
                              : level === 'Medium'
                              ? 'bg-yellow-500 text-white shadow-lg transform scale-105'
                              : 'bg-green-500 text-white shadow-lg transform scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Expected Delivery */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="mr-2">📅</span>
                    Expected Delivery Date *
                  </label>
                  <input
                    type="date"
                    name="expectedDelivery"
                    value={formData.expectedDelivery}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300"
                    required
                  />
                </motion.div>

                {/* Notes */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.4 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="mr-2">📝</span>
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or notes..."
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 resize-none"
                  />
                </motion.div>
              </div>
            </div>

            {/* Submit Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="mt-8 flex justify-end space-x-4"
            >
              <button
                type="button"
                onClick={() => navigate('/management')}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 font-medium"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Order...
                  </div>
                ) : (
                  'Create Order'
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateOrder;
