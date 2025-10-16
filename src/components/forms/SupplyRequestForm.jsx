import React, { useState } from 'react';

const SupplyRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    unit: 'pieces',
    urgency: 'normal',
    reason: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
      setFormData({
        itemName: '',
        quantity: '',
        unit: 'pieces',
        urgency: 'normal',
        reason: '',
        department: ''
      });
    } catch (error) {
      console.error('Error submitting supply request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
            Item Name
          </label>
          <input
            id="itemName"
            name="itemName"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="e.g., Surgical masks, Vaccines"
          />
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            id="department"
            name="department"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="emergency">Emergency</option>
            <option value="icu">ICU</option>
            <option value="surgery">Surgery</option>
            <option value="medical">Medical</option>
            <option value="maternity">Maternity</option>
            <option value="pharmacy">Pharmacy</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
            Unit
          </label>
          <select
            id="unit"
            name="unit"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.unit}
            onChange={handleChange}
          >
            <option value="pieces">Pieces</option>
            <option value="boxes">Boxes</option>
            <option value="packs">Packs</option>
            <option value="liters">Liters</option>
            <option value="kg">Kilograms</option>
            <option value="mg">Milligrams</option>
          </select>
        </div>

        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
            Urgency
          </label>
          <select
            id="urgency"
            name="urgency"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason for Request
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={3}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Explain why this supply is needed..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Submitting Request...' : 'Submit Supply Request'}
      </button>
    </form>
  );
};

export default SupplyRequestForm;
