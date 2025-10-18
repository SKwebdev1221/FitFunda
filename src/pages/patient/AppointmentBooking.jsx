import React, { useState } from 'react';
import AppointmentForm from '../../components/forms/AppointmentForm';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
const AppointmentBooking = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', available: true },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', available: true },
    { id: 3, name: 'Dr. Emily Davis', specialty: 'Pediatrics', available: false },
    { id: 4, name: 'Dr. Robert Wilson', specialty: 'Orthopedics', available: true }
  ];

  const availableTimes = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleBooking = (appointmentData) => {
    console.log('Booking appointment:', appointmentData);
    // Here you would typically send the data to your API
    alert('Appointment booked successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="c h-font text-3xl font-bold text-gray-900">Book an Appointment</h1>
          <p className="w c mt-2 text-gray-600">Schedule a visit with one of our healthcare professionals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Appointment Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <AppointmentForm onSubmit={handleBooking} />
          </div>

          {/* Available Doctors */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Available Doctors</h2>
              <div className="space-y-4">
                {doctors.map(doctor => (
                  <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                      <p className="w text-sm text-gray-500">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        doctor.available
                          ? 'w bg-green-100 text-green-800'
                          : 'w bg-red-100 text-red-800'
                      }`}>
                        {doctor.available ? 'Available' : 'Unavailable'}
                      </span>
                      {doctor.available && (
                        <button
                          onClick={() => setSelectedDoctor(doctor.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                        >
                          Select
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointment Information</h3>
              <ul className="w text-sm text-gray-600 space-y-1">
                <li>• Appointments are confirmed via email</li>
                <li>• Bring your ID and insurance card</li>
                <li>• Arrive 15 minutes early for check-in</li>
                <li>• Cancellation policy: 24 hours notice</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Upcoming Appointments</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="w font-medium">Dr. Sarah Johnson - Cardiology</p>
                <p className="w text-sm text-gray-500">January 25, 2024 at 10:00 AM</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 text-sm">
                  Reschedule
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 text-sm">
                  Cancel
                </button>
              </div>
            </div>

            <div className="text-center py-8 text-gray-500">
              <p>No more upcoming appointments</p>
              <button className="mt-2 text-blue-600 hover:text-blue-800">
                View appointment history
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
