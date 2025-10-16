import React, { useState } from 'react';

const AppointmentForm = ({ onSubmit, doctorId }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    time: '',
    reason: '',
    urgency: 'normal'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({ ...formData, doctorId });
      setFormData({
        patientName: '',
        date: '',
        time: '',
        reason: '',
        urgency: 'normal'
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
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
      <div>
        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
          Patient Name
        </label>
        <input
          id="patientName"
          name="patientName"
          type="text"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.patientName}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            id="time"
            name="time"
            type="time"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
          Urgency Level
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
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason for Visit
        </label>
        <textarea
          id="reason"
          name="reason"
          rows={3}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Describe the reason for your appointment..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
};

export default AppointmentForm;
